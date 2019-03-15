import 'mocha-typescript'

import { fs } from '@nofrills/fs'

import expect from './expect'
import { MediaInfo } from '../src/MediaInfo'

@suite
class MediaInfoSpec {
  static readonly videofile = fs.join(__dirname, '../.cache', 'sample-video.mp4')

  private readonly mediainfo = new MediaInfo()

  @test('should get media info output')
  async shouldGetMediaInfo() {
    const results = await this.mediainfo.info(MediaInfoSpec.videofile)
    expect(results).not.empty
  }

  @test('should get media info output as json')
  async shouldGetMediaInfoJson() {
    const json = await this.mediainfo.object(MediaInfoSpec.videofile)
    await fs.save(`${MediaInfoSpec.videofile}.json`, json)
    expect(json).not.empty
  }

  @test('should get media info output as xml')
  async shouldGetMediaInfoXml() {
    const xml = await this.mediainfo.xml(MediaInfoSpec.videofile)
    expect(xml).not.empty
  }

  @test('should get version output')
  async shouldGetVersion() {
    const version = await this.mediainfo.version()
    expect(version.length).equal(2)
  }
}
