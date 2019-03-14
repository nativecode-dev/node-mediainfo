import { exec, ExecOptions } from 'child_process'

import { Logger } from './Logging'
import { MediaInfoOptions, OutputType } from './MediaInfoOptions'
import { xml2json } from 'xml-js'

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

  async json(filename: string): Promise<{}> {
    const xml = await this.xml(filename)
    const json = xml2json(xml)
    return JSON.parse(json)
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

      if (this.options.bom && args.every(opt => opt.toUpperCase() === '--BOM') === false) {
        argopts.push('--BOM')
      }

      if (this.options.full && args.every(opt => opt.toUpperCase() === '--FULL') === false) {
        argopts.push('--Full')
      }

      if (args.every(opt => opt.toUpperCase().startsWith('--DETAILS=') === false)) {
        argopts.push(`--Details=${this.options.details}`)
      }

      if (args.every(opt => opt.toUpperCase().startsWith('--LANGUAGE=') === false)) {
        argopts.push(`--Language=${this.options.language}`)
      }

      if (args.every(opt => opt.toUpperCase().startsWith('--OUTPUT=') === false)) {
        argopts.push(`--Output=${this.options.output}`)
      }

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

  private split(text: string): string[] {
    return text
      .replace('\r\n', '\n')
      .split('\n')
      .map(x => x.trim())
      .filter(x => x !== '')
  }
}
