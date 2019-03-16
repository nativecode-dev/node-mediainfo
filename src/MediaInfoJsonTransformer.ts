import { Dictionary } from '@nofrills/types'
import { Attributes, Element } from 'xml-js'

import { MediaInfoTransformerBase } from './MediaInfoTransformerBase'

export class MediaInfoJsonTransformer extends MediaInfoTransformerBase {
  transformAttributes(attributes: Attributes): Dictionary | null {
    return null
  }

  transformElement(element: Element): Dictionary | null {
    const instance: any = {}

    if (element.name) {
      const current = instance[element.name] = {}

      if (element.elements) {
        return this.transformElements(element.elements, current)
      }
    }

    if (element.elements) {
      return this.transformElements(element.elements, instance)
    }

    return instance
  }

  transformElements(elements: Element[], instance: any): Dictionary[] {
    return elements
      .map(e => this.transformElement(e))
      .filter(e => e !== null)
      .map(e => {
        return [e, Object.keys(e as Dictionary)]
      })
  }

  transformText(element: Element): Dictionary | null {
    return null
  }
}
