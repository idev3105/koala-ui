import { KoalaSdk } from './KoalaSdk'
import { SdkConfig } from './types'

export function getServerSdkInstance(config?: SdkConfig) {
  return new KoalaSdk({
    BASE: config?.baseUrl || process.env.KOALA_SDK_BASE_URL,
    TOKEN: config?.token,
  })
}
