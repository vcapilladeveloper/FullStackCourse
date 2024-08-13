import Country from './Country'

const CountryList = ({ countries, showCountry }) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    }

    return (
        <div>
            <ul>
                {
                    countries.map(c =>
                        <li key={c.name.common} >
                            {c.name.common}
                            <button onClick={() => showCountry(c.name.common)}>show</button>
                        </li>

                    )}

            </ul>
        </div>
    )
}

export default CountryList