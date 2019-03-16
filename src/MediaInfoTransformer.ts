import { Dictionary } from '@nofrills/types'
import { Element, Attributes } from 'xml-js'

export interface MediaInfoTransformer {
  transform(xml: string): Dictionary | null
  transformAttributes(attributes: Attributes): Dictionary | null
  transformElement(element: Element): Dictionary | null
  transformText(element: Element): Dictionary | null
}
