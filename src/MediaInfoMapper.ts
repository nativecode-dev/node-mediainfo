import { Is } from '@nofrills/types'
import { MediaInfoXml, XmlElement } from './Interfaces/MediaInfoXml'

export class MediaInfoMapper {
  map(xml: MediaInfoXml): any {
    return this.mapElements(xml.elements, {})
  }

  private mapElements(elements: XmlElement[], instance: any): any {
    return elements.reduce((result, element) => {
      if (Is.string(element.name)) {
        const value = (result[element.name as string] = {})
        if (element.elements) {
          this.mapElements(element.elements as XmlElement[], value)
        }
      }
      return result
    }, instance)
  }
}
