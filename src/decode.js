import { decoder, isNotString } from './helpers'

/**
 * @param {string} deeplink - required, deeplink to decode
 * @returns {{
 *  type: string,
 *  value: string,
 *  language?: string,
 *  region?: string,
 *  set?: string
 * }} decoded base64 params or given string as event name
 */
const decode = deeplink => {
  if (typeof deeplink === 'object' && deeplink.type && deeplink.value) {
    return deeplink
  }
  if (isNotString(deeplink)) {
    throw new Error('Deeplink of wrong type')
  }

  if (!deeplink.startsWith('enc__')) {
    return {
      type: 'event',
      value: deeplink
    }
  }

  const [ , strToDecode ] = deeplink.split('enc__')

  const decodedDeeplink = JSON.parse(decoder(strToDecode))

  return {
    type: decodedDeeplink.t === 'e' ? 'event' : 'text',
    value: decodedDeeplink.v,
    language: decodedDeeplink.l,
    region: decodedDeeplink.r,
    set: decodedDeeplink.s
  }
}

export default decode