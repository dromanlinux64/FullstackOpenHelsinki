const CountriesList = (prospes) => {
  const { countriesToShow, handleShowCountry } = prospes;
  //cca3 is a unique code for a country
  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify anoter filter</p>;
  } else if (countriesToShow.length > 1) {
    return (
      <>
        {countriesToShow.map((country) => (
          <div key={country.cca3}> 
            {country.name.common}
            <button onClick={() => handleShowCountry(country.cca3)}>
              show
            </button>
          </div>
        ))}
      </>
    );
  }
};


export default CountriesList;
