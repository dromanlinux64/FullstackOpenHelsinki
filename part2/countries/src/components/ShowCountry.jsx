import ShowWeather from "./ShowWeather";

const Languages = (prospes) => {
  const { languages } = prospes;
  //console.log("languages", Object.values(languages));
  return (
    <>
      <h3>languages</h3>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
    </>
  );
};

const ShowCountry = (propes) => {
  const { countriesToShow, weather, descriptionCodeWMO } = propes;
  if (countriesToShow.length === 1) {
    const pais = countriesToShow[0];
    //console.log("ShowCountry",pais,weather  )
    return (
      <div>
        <h2>{pais.name.common}</h2>
        <p>Capital {pais.capital[0]}</p>
        <p>Area {pais.area}</p>
        <Languages languages={pais.languages} />
        <img src={pais.flags.png} alt={pais.flags.alt} />
        <ShowWeather
          countriesToShow={countriesToShow}
          weather={weather}
          descriptionCodeWMO={descriptionCodeWMO}
        />
      </div>
    );
  }
};
export default ShowCountry;
