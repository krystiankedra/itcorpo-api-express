const axios = require('axios')

const getRequest = async (url) => {
  try {
    const response = await axios.get(url)
    return response && response.data ? response.data : {}
  } catch (error) {
    return {}
  }
}

module.exports = {
  getRequest
}
