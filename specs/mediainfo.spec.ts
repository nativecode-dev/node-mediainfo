import 'mocha'

import expect from './expect'
import { MediaInfo } from '../src/MediaInfo'

describe('execute mediainfo', () => {
  const mediainfo = new MediaInfo()

  it('should get version', async () => {
    const version = await mediainfo.version()
    expect(version.length).equal(2)
  })
})
