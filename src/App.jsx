import { useState, useEffect } from 'react'
import './App.css'
import CountryData from './country-info/CountryData';

const URL = "https://restcountries.com/v3.1/all";

export default function App() {

  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [show, setShow] = useState(false);
  const [nation, setNation] = useState([]);

  const handleChange = (e) => {
    setFilterCountry(e.target.value);
    e.target.value === "" ? setShow(false) : "";
  };

  const showCountry = (country) => {
    setShow((prev) => !prev);
    setNation(country);
  };

  useEffect(() => {

    if(filterCountry != ""){
      fetch(URL)
      .then((res) => res.json())
      .then((data) =>
        setCountries(
          data.filter((country) =>
            country.name.common.toLowerCase().includes(filterCountry)
          )
        )
      );
    }

  }, [filterCountry]);

  console.log(countries)

  return (
    <div className="App">
      <div>
        <h1>Search for a Country:</h1>
        <input onChange={handleChange} value={filterCountry} />
      </div>
      <p>debug: {filterCountry}</p>

      <div className='container-countries'>

        {
          filterCountry === "" ? (
            <h3>Find country</h3>
          ) : 
          countries.length === 0 ? (
            <h3>No countries found.</h3>
          ) : countries.length > 10 ? (
            <h3>Too many matches, please be more specific.</h3>
          ) : countries.length < 10 && countries.length > 1 ? (
            countries.map((country) => (
              <div className='item' key={country.name.common}>
                <h2>{country.name.common}</h2>
                <button onClick={() => showCountry(country)}>SHOW</button>
              </div>
            ))
          ) : countries.length === 1 ? <CountryData data={countries[0]}/> : ""}

        {show ? <CountryData data={nation} /> : ""}

      </div>
    </div>
  );
}
