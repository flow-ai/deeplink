import { encoder, isNotString } from './helpers'

/**
 * Encode given data into base64 string
 * @param {Object} params
 * @param {string} params.channelName - required
 * @param {string} params.type - required, postback type
 * @param {string} params.value - required, postback value
 * @param {string} params.language - optional
 * @param {string} params.region - optional
 * @param {string} params.set - optional
 * @returns {string} base64 encoded params
 */
const encode = params => {
  if (typeof params !== 'object') {
    throw new Error('Params should be object')
  }

  const { channelName, type, value } = params

  if (!channelName || !type || !value) {
    throw new Error('Required param is missing')
  }
  if (isNotString(channelName) || isNotString(type) || isNotString(value)) {
    throw new Error('Required param of wrong type')
  }
  if (type !== 'event' && type !== 'text') {
    throw new Error('Wrong value for type')
  }

  const { language, region, set } = params

  const deeplinkParams = {
    t: type === 'event' ? 'e' : 't',
    v: value.trim(),
    l: language,
    r: region,
    s: set
  }

  return `enc__${encoder(JSON.stringify(deeplinkParams))}`
}

export default encode