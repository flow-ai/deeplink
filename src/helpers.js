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

const isNotString = str => typeof str !== 'string'

export {
  encoder,
  decoder,
  isNotString
}