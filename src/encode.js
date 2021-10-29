import { encoder, isNotString } from './helpers'

/**
 * Encode given data into base64 string
 * @param {Object} params
 * @param {string} params.channelName - required
 * @param {string} params.value - required, event name
 * @param {string} params.language - optional
 * @param {string} params.region - optional
 * @param {string} params.set - optional
 * @returns {string} base64 encoded params
 */
const encode = params => {
  if (typeof params !== 'object') {
    throw new Error('Params should be object')
  }

  const { channelName, value } = params

  if (!channelName || !value) {
    throw new Error('Required param is missing')
  }
  if (isNotString(channelName) || isNotString(value)) {
    throw new Error('Required param of wrong type')
  }

  const { language, region, set } = params

  const deeplinkParams = {
    v: value.trim(),
    l: language,
    r: region,
    s: set
  }

  return `__${encoder(JSON.stringify(deeplinkParams))}`
}

export default encode