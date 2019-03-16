import { Attributes, Element, Options, xml2js } from 'xml-js'
import { MediaInfoTransformer } from './MediaInfoTransformer'

export abstract class MediaInfoTransformerBase implements MediaInfoTransformer {
  transform(xml: string): Promise<any> {
    const options: Options.XML2JS = {
      compact: false,
    }
    const root: Element = xml2js(xml, options) as Element
    return this.element(root)
  }

  abstract transformAttributes(attributes: Attributes): Promise<any>
  abstract transformElement(element: Element): Promise<any>
  abstract transformText(element: Element): Promise<any>

  private async element(element: Element): Promise<any> {
    const transformations = []
    transformations.push(await this.transformElement(element))

    if (element.attributes) {
      const attributes = await this.transformAttributes(element.attributes)
      transformations.push(attributes)
    }

    if (element.type === 'text') {
      const text = await this.transformText(element)
      transformations.push(text)
    }

    if (element.elements) {
      const elements = element.elements as Element[]
      const enumerated = await this.enumerate(elements)
      transformations.push(enumerated)
    }

    return transformations.reduce((result, current) => ({ ...result, ...current }), {})
  }

  private async enumerate(elements: Element[]): Promise<any> {
    return elements.reduce((result, current) => ({ ...result, ...current }), {})
  }
}
