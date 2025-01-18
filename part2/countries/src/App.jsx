import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";
import ShowCountry from "./components/ShowCountry";
import countriesService from "./services/countries";

const { getAll, getWeather, descriptionCodeWMO } = countriesService;

const App = () => {
  const [paises, setPaises] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [capitalWeather, setCapitalWeather] = useState({});
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    getAll()
      .then((CountriesList) => {
        //console.log(CountriesList);
        setPaises(CountriesList);
      })
      .catch((err) => {
        console.log(`Error getting Countries`, err);
      });
  }, []);

  useEffect(() => {
    const filtrado = paises.filter((pais) => {
      //console.log(pais.name.common.toLowerCase().includes(filtro),pais.name.common)
      return pais.name.common.toLowerCase().includes(filtro.toLowerCase());
    });
    //console.log(filtrado);
    setCountriesToShow(filtrado);
  }, [filtro, paises]);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const capitalLatLng = countriesToShow[0].capitalInfo.latlng;
      //console.log("capitalLatLng",capitalLatLng)
      getWeather(capitalLatLng)
        .then((weather) => {
          //console.log("weather",weather);
          setCapitalWeather(weather);
        })
        .catch((err) => {
          console.log(`Error getting Capital Weather`, err);
        });
    }
  }, [countriesToShow]);

  const handleFiltroChange = (event) => {
    //console.log(event.target.value)
    setFiltro(event.target.value);
  };

  const handleShowCountry = (key) => {
    setCountriesToShow(
      countriesToShow.filter((pais) => {
        return pais.cca3 === key;
      })
    );
  };

  return (
    <>
      <h3>Busqueda</h3>
      <Filter filtro={filtro} handleFiltroChange={handleFiltroChange} />
      <CountriesList
        countriesToShow={countriesToShow}
        handleShowCountry={handleShowCountry}
      />
      <ShowCountry
        countriesToShow={countriesToShow}
        weather={capitalWeather}
        descriptionCodeWMO={descriptionCodeWMO}
      />
    </>
  );
};

export default App;
