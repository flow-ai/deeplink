import { encoder, isNotString, cutType } from './helpers'

/**
 * Encode given data into base64 string
 * @param {Object} params
 * @param {string} params.value - required, event name or text
 * @param {string} params.channelName - optional
 * @param {string} params.language - optional
 * @param {string} params.region - optional
 * @param {string} params.set - optional
 * @param {Array<{}>} params.params - optional
 * @param {string} params.type - optional, event or  text
 * @returns {string} base64 encoded params
 */
const encode = params => {
  if (typeof params !== 'object') {
    throw new Error('Params should be object')
  }

  const { value } = params

  if (!value) {
    throw new Error('Required param is missing')
  }
  if (isNotString(value)) {
    throw new Error('Required param of wrong type')
  }

  const { language, region, set, type } = params

  const deeplinkParams = {
    v: value.trim(),
    l: language,
    r: region,
    s: set,
    t: cutType(type)
  }

  if (params.params) {
    deeplinkParams.p = params.params.map(param => ({
      l: param.label,
      v: param.value
    }))
  }

  return `__${encoder(JSON.stringify(deeplinkParams))}`
}

export default encode