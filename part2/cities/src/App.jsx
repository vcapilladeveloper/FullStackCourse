import { useState, useEffect } from 'react'
import CitiesService from './services/cities'
import CountryList from './components/CountryList'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    console.log('effect')
    CitiesService
      .getAll()
      .then(returnedCities => {
        setCountries(returnedCities)
      })
  }

  useEffect(hook, [])

  const matchedContries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      find country < input value={search} onChange={({ target }) => setSearch(target.value)} />
      <CountryList countries={matchedContries} showCountry={setSearch} />
    </div>
  )
}

export default App
