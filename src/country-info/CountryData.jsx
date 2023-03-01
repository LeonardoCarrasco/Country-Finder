const CountryData = ({ data }) => {

    return (
      <div className="country">
        {!data ? (
          ""
        ) : (
          <>
            <h1>{data.name.common}</h1>
            <p>Capital: {data.capital > 1 ? data.capital[0] : ""}</p>
            <p>population: {data.population}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(data.languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <div>
              <img src={data.flags.png} alt="" />
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default CountryData;