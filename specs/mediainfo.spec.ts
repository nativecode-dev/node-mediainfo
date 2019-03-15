import 'mocha-typescript'

import { fs } from '@nofrills/fs'

import expect from './expect'
import { MediaInfo } from '../src/MediaInfo'
import { MediaInfoMapper } from '../src/MediaInfoMapper'

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
    const json = await this.mediainfo.json(MediaInfoSpec.videofile)
    await fs.writeFile(`${MediaInfoSpec.videofile}.json`, JSON.stringify(json))
    const mapper = new MediaInfoMapper()
    const mapped = mapper.map(json)
    console.log(mapped)
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
