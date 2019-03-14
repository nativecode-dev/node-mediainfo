import { fs } from '@nofrills/fs'
import { exec, ExecOptions } from 'child_process'

import { MediaInfoOptions, OutputType } from './MediaInfoOptions'

const DefaultMediaInfoOptions: MediaInfoOptions = {
  bom: false,
  details: 1,
  executable: '/usr/bin/mediainfo',
  full: true,
  language: 'raw',
  output: OutputType.Xml,
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

  version(): Promise<string[]> {
    return this.exec('', '--Version')
  }

  protected exec(filename: string, ...args: string[]): Promise<string[]> {
    const argopts = [...args]

    if (this.options.bom) {
      argopts.push('--BOM')
    }

    if (this.options.full) {
      argopts.push('--Full')
    }

    argopts.push(`--Details=${this.options.details}`)
    argopts.push(`--Language=${this.options.language}`)
    argopts.push(`--Output=${this.options.output}`)

    const command = [this.options.executable, ...args, filename].join(' ')
    const options: ExecOptions = {
      windowsHide: true,
    }

    return new Promise<string[]>((resolve, reject) => {
      exec(command, options, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr))
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
