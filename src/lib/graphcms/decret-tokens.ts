// Dependencies
import StringCrypto from 'string-crypto'

// Internals
import {
  __GRAPHCMS_TOKENS_DEVELOP_ENC__,
  __GRAPHCMS_TOKENS_PRODUCTION_DEC__,
} from './tokens.enc'

const { decryptString } = new StringCrypto()

export const getDecryptedDevelopToken = (): string => {
  return decryptString(
    __GRAPHCMS_TOKENS_DEVELOP_ENC__,
    process.env.GRAPHCMS_ENCRYPTION_KEY + process.env.GRAPHCMS_ENCRYPTION_IV
  )
}

export const getDecryptedProductionToken = (): string => {
  return decryptString(
    __GRAPHCMS_TOKENS_PRODUCTION_DEC__,
    process.env.GRAPHCMS_ENCRYPTION_KEY + process.env.GRAPHCMS_ENCRYPTION_IV
  )
}
