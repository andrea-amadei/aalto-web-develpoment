import {useEffect, useState} from 'react'
import axios from "axios";

const handleInputChange = (event, setter) => {
  setter(event.target.value);
}

const SearchBox = ({ search, setSearch }) =>
  <div>
    <b>Search country:</b>
    <input type="text" value={search} onChange={(event) => handleInputChange(event, setSearch)}/>
    <hr />
  </div>

const SearchList = ({ search, countries, setCountryView, setSelectedCountry }) => {
  const handleShowButtonClick = (countryCode) => {
    setCountryView(true);
    setSelectedCountry(countryCode);
  }
  
  return (
    <div>
      {countries
        .filter(x =>
          x.name.common.toLowerCase().includes(search) ||
          x.name.official.toLowerCase().includes(search)
        )
        .map(x => <div key={x.cca3}>{x.name.common}
          <button onClick={() => handleShowButtonClick(x.cca3)}>Show</button>
        </div>)
      }
    </div>
  );
}

const CountryView = ({ countryId, countries, setCountryView }) => {
  const country = countries.find(x => x.cca3 === countryId);
  
  return (
    <div>
      <button onClick={() => setCountryView(false)}>Back</button>
      <hr />
      
      <h2>{country.name.official} {country.flag}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area} km^2</div>
      
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(x => <li key={x[0]}>{x[1]}</li>)}
      </ul>
    </div>
  );
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countryView, setCountryView] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
      .catch(() => console.log("Unable to fetch data from server!"));
  }, []);
  
  return (
    <div>
      <h1>Countries</h1>
      {
        countryView ?
          <CountryView countryId={selectedCountry} countries={countries} setCountryView={setCountryView} />
        :
          <>
            <SearchBox search={search} setSearch={setSearch} />
            <SearchList search={search} countries={countries} setCountryView={setCountryView} setSelectedCountry={setSelectedCountry} />
          </>
      }
    </div>
  )
}

export default App;
