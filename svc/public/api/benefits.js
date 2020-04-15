const { benefitsURL, benefitURL } = require('./config')
const { getRequest } = require('./requests')
const { FileReader } = require('./../FileReader/fileReader')
const csv = require('csvtojson')
const path = require("path")

const file = (countryCodeAndExtension) => {
  return path.resolve(__dirname, `../../../dataImports/benefits-${countryCodeAndExtension}`)
}

const getDataForBenefitById = async (id) => {
  return await getRequest(benefitURL(id))
}

const getDataForBenefits = async () => {

  const parsedBenefits = (benefit) => ({
    id: benefit.id,
    city: benefit.city,
    country: benefit.country,
    service: benefit.service,
    subscribedAtDate: benefit.subscribedAtDate,
    name: benefit.beneficiary.name,
    email: benefit.beneficiary.email,
    cost: benefit.monthlyFee
  })

  const result = await getRequest(benefitsURL())
  return result.map(benefit => parsedBenefits(benefit))
}

const getJSONDataForBenefits = () => {
  const fileReader = new FileReader()
  const countryCodeAndExtensions = [ 'DE.json', 'PL.json']
  const fetchedCountries = countryCodeAndExtensions.flatMap((code) => {
    return JSON.parse(fileReader.getContent(file(code)))
  })

  return fetchedCountries
}

const getCSVDataForBenefits = async () => {
  const countryCodeAndExtensions = [ 'UK.csv', 'FR.csv']
  const fetchedCountries = countryCodeAndExtensions.flatMap(code => {
    return csv().fromFile(file(code))
  })
  const result = await Promise.all(fetchedCountries)

  return result.flat()

}

module.exports = {
  getDataForBenefits,
  getJSONDataForBenefits,
  getCSVDataForBenefits,
  getDataForBenefitById
}
