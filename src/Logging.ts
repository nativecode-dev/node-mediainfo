import { CreateLogger, CreateOptions, Lincoln } from '@nofrills/lincoln-debug'

const options = CreateOptions('mediainfo')
export const Logger: Lincoln = CreateLogger(options)
