# @nativecode/mediainfo

Provides an interface to the `mediainfo` executable, written in the fanstastic Typescript! Returns output either as normal text, HTML, XML, or returns a parsed JSON object representing the XML representation. Transform the JSON represenation of output into whatever structure you want via the `MediaInfoTransformer` interface.

## Installation

```bash
npm install @nativecode/mediainfo
```

## Usage

```typescript
import { MediaInfo } from '@nativecode/mediainfo'

const mediainfo = new MediaInfo()

export async function getMediaInfo(): Promise<string[]> {
  const output: string[] = await mediainfo.info('sample-video.mp4')
  console.log(output)
}

export async function getMediaInfoXml(): Promise<string> {
  const xml: string = await mediainfo.xml('sample-video.mp4')
  console.log(xml)
}

export async function getMediaInfoVersion(): Promise<string> {
  const version: string[] = await mediainfo.version()
  return version[1]
}
```
