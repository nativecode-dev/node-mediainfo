export interface XmlAttributes {
  [name: string]: string
}

export interface XmlElement {
  [name: string]: XmlAttributes | MediaInfoXmlElement | MediaInfoXmlElement[] | string | undefined
}

export interface XmlDeclarationAttributes extends XmlAttributes {
  encoding: string
  version: string
}

export interface XmlDeclaration {
  attributes: XmlDeclarationAttributes
}

export interface MediaInfoXmlElement extends XmlElement {
  attributes?: XmlAttributes
  elements?: MediaInfoXmlElement[]
  name?: string
  text?: string
  type: string
}

export interface MediaInfoXml {
  declaration: XmlDeclaration
  elements: MediaInfoXmlElement[]
}
