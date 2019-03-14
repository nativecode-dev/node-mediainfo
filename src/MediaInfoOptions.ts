export enum OutputType {
  Html = 'HTML',
  Xml = 'XML',
}

export interface MediaInfoOptions {
  bom: boolean
  details: number
  executable: string
  full: boolean
  language: string
  output: OutputType
}
