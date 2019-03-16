import { Element, Attributes } from 'xml-js'

export interface MediaInfoTransformer {
  transform(xml: string, instance: any): Promise<any>
  transformAttributes(attributes: Attributes, instance: any): Promise<any>
  transformElement(element: Element, instance: any): Promise<any>
  transformText(element: Element, text: string, instance: any): Promise<any>
}
