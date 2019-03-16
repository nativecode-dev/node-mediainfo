import 'mocha-typescript'

import { fs } from '@nofrills/fs'

import { MediaInfo } from '../src/MediaInfo'
import { MediaInfoJsonTransformer } from '../src/MediaInfoJsonTransformer'

const VideoFile = fs.join(__dirname, '../assets', 'sample-video.mp4')

@suite
class MediaInfoTransformSpec {
  private readonly mediainfo = new MediaInfo()

  @test
  async shouldTransformXmlToJson() {
    const xml = await this.mediainfo.xml(VideoFile)
    const transformer = new MediaInfoJsonTransformer()
    const transformed = await transformer.transform(xml)
    await fs.save(`${VideoFile}.transform.json`, transformed)
  }
}
