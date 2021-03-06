import { decoder, isNotString, uncutType } from './helpers'

/**
 * @param {string} deeplink - required, deeplink to decode
 * @returns {{
 *  value: string,
 *  language?: string,
 *  region?: string,
 *  set?: string
 * }} decoded base64 params or given string as event name
 */
const decode = deeplink => {
  if (typeof deeplink === 'object' && deeplink.value) {
    return deeplink
  }
  if (isNotString(deeplink)) {
    throw new Error('Deeplink of wrong type')
  }

  if (!deeplink.startsWith('__')) {
    return {
      value: deeplink
    }
  }

  const [ , strToDecode ] = deeplink.split('__')

  const decodedDeeplink = JSON.parse(decoder(strToDecode))

  return {
    value: decodedDeeplink.v,
    language: decodedDeeplink.l,
    region: decodedDeeplink.r,
    set: decodedDeeplink.s,
    type: uncutType(decodedDeeplink.t),
    params: decodedDeeplink.p?.map(p => ({
      label: p.l,
      value: p.v
    }))
  }
}

export default decode