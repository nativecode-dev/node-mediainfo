import { Attributes, Element } from 'xml-js'
import { MediaInfoTransformerBase } from './MediaInfoTransformerBase'

export class MediaInfoJsonTransformer extends MediaInfoTransformerBase {
  transformAttributes(attributes: Attributes): Promise<any> {
    return Promise.resolve({})
  }

  transformElement(element: Element): Promise<any> {
    return Promise.resolve({})
  }

  transformText(element: Element): Promise<any> {
    return Promise.resolve({})
  }
}
