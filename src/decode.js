import { decoder, isNotString, uncutType } from './helpers'

/**
 * @param {string} deeplink - required, deeplink to decode
 * @returns {{
 *  value: string,
 *  language?: string,
 *  region?: string,
 *  set?: string,
 *  type: string,
 *  buttonId: string,
 *  params: {Array<Object>},
 *  decoded: boolean
 * }} decoded base64 params or given string as event name
 */
const decode = deeplink => {
  if (typeof deeplink === 'object' && deeplink.value) {
    return { ...deeplink, decoded: false }
  }
  if (isNotString(deeplink)) {
    throw new Error('Deeplink of wrong type')
  }

  if (!deeplink.startsWith('__')) {
    return {
      value: deeplink,
      decoded: false
    }
  }

  const [, strToDecode] = deeplink.split('__')

  const decodedDeeplink = JSON.parse(decoder(strToDecode))

  let params = []

  if (Array.isArray(decodedDeeplink.p)) {
    params = decodedDeeplink.p.map(p => ({
      label: p.l,
      value: p.v
    }))
  } else if (decodedDeeplink.p && typeof decodedDeeplink.p === 'object') {
    params = {}
    Object.keys(decodedDeeplink.p).forEach(key => {
      params[key] = [{ value: decodedDeeplink.p[key][0].v }]
    })
  }

  return {
    value: decodedDeeplink.v,
    language: decodedDeeplink.l,
    region: decodedDeeplink.r,
    set: decodedDeeplink.s,
    type: uncutType(decodedDeeplink.t),
    buttonId: decodedDeeplink.b,
    params,
    decoded: true
  }
}

export default decode