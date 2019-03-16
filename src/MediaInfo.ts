import { Element, Options, xml2js } from 'xml-js'
import { exec, ExecOptions } from 'child_process'

import { Logger } from './Logging'
import { MediaInfoOptions, OutputType } from './MediaInfoOptions'

const DefaultMediaInfoOptions: MediaInfoOptions = {
  bom: false,
  details: 1,
  executable: '/usr/bin/mediainfo',
  full: false,
  language: 'raw',
  maxBufferSize: 1024 * 1024 * 10,
}

export class MediaInfo {
  private readonly options: MediaInfoOptions

  constructor(private readonly opts?: Partial<MediaInfoOptions>) {
    this.options = opts ? { ...DefaultMediaInfoOptions, ...opts } : DefaultMediaInfoOptions
  }

  execute(filename: string, ...args: string[]): Promise<string[]> {
    return this.exec(filename, ...args)
  }

  info(filename: string): Promise<string[]> {
    return this.exec(filename)
  }

  async html(filename: string): Promise<string> {
    const results = await this.exec(filename, `--Output=${OutputType.Html}`)
    return results.join('\n')
  }

  async object(filename: string): Promise<Element> {
    const xml = await this.xml(filename)
    const options: Options.XML2JS = {
      compact: false,
    }
    return xml2js(xml, options) as Element
  }

  async xml(filename: string): Promise<string> {
    const results = await this.exec(filename, `--Output=${OutputType.Xml}`)
    return results.join('\n')
  }

  version(): Promise<string[]> {
    return this.exec('', '--Version')
  }

  protected exec(filename: string, ...args: string[]): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const argopts = [...args]
      this.configureOptions(args, argopts)

      const command = [this.options.executable, ...argopts, filename].join(' ')
      Logger.debug(command)

      const options: ExecOptions = {
        maxBuffer: this.options.maxBufferSize,
        windowsHide: true,
      }

      exec(command, options, (error, stdout) => {
        if (error) {
          reject(error)
        } else {
          resolve(this.split(stdout))
        }
      })
    })
  }

  private configureOptions(args: string[], opts: string[]): void {
    const pushBOM = args.every(opt => opt.toUpperCase() !== '--BOM')
    const pushDetails = args.every(opt => opt.toUpperCase().startsWith('--DETAILS=') === false)
    const pushFull = args.every(opt => opt.toUpperCase() !== '--FULL')
    const pushLanguage = args.every(opt => opt.toUpperCase().startsWith('--LANGUAGE=') === false)
    const pushOutput = args.every(opt => opt.toUpperCase().startsWith('--OUTPUT=') === false)
    const hasVersion = args.some(opt => opt === '--Version')

    if (this.options.bom && pushBOM && hasVersion === false) {
      opts.push('--BOM')
    }

    if (this.options.full && pushFull && hasVersion === false) {
      opts.push('--Full')
    }

    if (pushDetails && hasVersion === false) {
      opts.push(`--Details=${this.options.details}`)
    }

    if (pushLanguage && hasVersion === false) {
      opts.push(`--Language=${this.options.language}`)
    }

    if (pushOutput && hasVersion === false) {
      opts.push(`--Output=${this.options.output}`)
    }
  }

  private split(text: string): string[] {
    return text
      .replace('\r\n', '\n')
      .split('\n')
      .map(x => x.trim())
      .filter(x => x !== '')
  }
}
