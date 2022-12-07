const TYPES = {
  event: 'e',
  text: 't',
  flow: 'f'
}

/**
 * 
 * @param {string} str 
 * @returns {string}
 * Returns base64 encoded string
 */
const encoder = str => {
  try {
    if (typeof btoa !== 'undefined') {
      return btoa(str)
    }
  } catch (err) {
    if (err.message !== 'btoa is not defined') {
      throw err
    }
  }
  
  return Buffer.from(str).toString('base64')
}

/**
 * 
 * @param {string} str 
 * @returns {string}
 * Accepts base64 string and returns decoded result
 */
const decoder = str => {
  try {
    if (typeof atob !== 'undefined') {
      return atob(str)
    }
  } catch (err) {
    if (err.message !== 'atob is not defined') {
      throw err
    }
  }
  
  return Buffer.from(str, 'base64').toString()
}

/**
 * 
 * @param {any} str 
 * @returns {boolean}
 */
const isNotString = str => typeof str !== 'string'

/**
 * 
 * @param {string} fullType 
 * @returns {string}
 */
const cutType = fullType => TYPES[fullType] || TYPES.text

/**
 * 
 * @param {string} shortType 
 * @returns {string}
 */
const uncutType = shortType => Object.keys(TYPES).find(type => TYPES[type] === shortType)

export {
  encoder,
  decoder,
  isNotString,
  cutType,
  uncutType
}