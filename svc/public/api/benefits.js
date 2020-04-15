const { benefitsURL, benefitURL } = require('./config')
const { getRequest } = require('./requests')
const { FileReader } = require('./../FileReader/fileReader')
const csv = require('csvtojson')
const path = require("path")

const file = (countryCodeAndExtension) => {
  return path.resolve(__dirname, `../../../dataImports/benefits-${countryCodeAndExtension}`)
}

const mapperCountries = (source) => {
  return source.reduce((acc, val) => {
    acc.push(...val)
    return acc
  }, [])
}

const getDataForBenefitById = async (id) => {
  return await getRequest(benefitURL(id))
}

const getDataForBenefits = async () => {
  return await getRequest(benefitsURL())
}

const getJSONDataForBenefits = () => {
  const fileReader = new FileReader()
  const countryCodeAndExtensions = [ 'DE.json', 'PL.json']
  const fetchedCountries = countryCodeAndExtensions.map((code) => {
    return JSON.parse(fileReader.getContent(file(code)))
  })
  return mapperCountries(fetchedCountries)
}

const getCSVDataForBenefits = async () => {
  const countryCodeAndExtensions = [ 'UK.csv', 'FR.csv']
  const fetchedCountries = countryCodeAndExtensions.map(code => {
    return csv().fromFile(file(code))
  })
  const result = await Promise.all(fetchedCountries)
  return mapperCountries(result)
}

module.exports = {
  getDataForBenefits,
  getJSONDataForBenefits,
  getCSVDataForBenefits,
  getDataForBenefitById
}
