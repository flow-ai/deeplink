import { encoder, isNotString, cutType } from './helpers'

/**
 * Encode given data into base64 string
 * @param {Object} params
 * @param {string} params.value - required, event name, flowImmutableId or text
 * @param {string} params.channelName - optional
 * @param {string} params.language - optional
 * @param {string} params.region - optional
 * @param {string} params.set - optional
 * @param {Array<{}>} params.params - optional
 * @param {string} params.type - optional, event, flow or text
 * @param {string} params.buttonId - optional
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

  const { language, region, set, type, buttonId } = params

  const deeplinkParams = {
    v: encodeURIComponent(value.trim()),
    l: language,
    r: region,
    s: set,
    t: cutType(type),
    b: buttonId
  }

  if (Array.isArray(params.params)) {
    deeplinkParams.p = params.params.map(param => ({
      l: encodeURIComponent(param.label),
      v: encodeURIComponent(param.value)
    }))
  } else if (params.params && typeof params.params === 'object') {
    deeplinkParams.p = {}
    Object.keys(params.params).forEach(key => {
      deeplinkParams.p[encodeURIComponent(key)] = [{ v: encodeURIComponent(params.params[key][0].value) }]
    })
  }

  if (Array.isArray(params.tags)) {
    deeplinkParams.tg = params.tags.map(param => ({
      l: encodeURIComponent(param.label),
      v: encodeURIComponent(param.value)
    }))
  } else if (params.tags && typeof params.tags === 'object') {
    deeplinkParams.tg = {}
    Object.keys(params.tags).forEach(key => {
      deeplinkParams.tg[encodeURIComponent(key)] = [{ v: encodeURIComponent(params.tags[key][0].value) }]
    })
  }

  return `__${encoder(JSON.stringify(deeplinkParams))}`
}

export default encode