import { Dictionary } from '@nofrills/types'
import { Attributes, Element, Options, xml2js } from 'xml-js'

import { MediaInfoTransformer } from './MediaInfoTransformer'

export abstract class MediaInfoTransformerBase implements MediaInfoTransformer {
  transform(xml: string): any {
    const options: Options.XML2JS = {
      compact: false,
    }
    const root: Element = xml2js(xml, options) as Element
    return this.transformElement(root)
  }

  abstract transformAttributes(attributes: Attributes): Dictionary | null
  abstract transformElement(element: Element): Dictionary | null
  abstract transformText(element: Element): Dictionary | null
}
