const ShowWeather = (prospes) => {
  const { countriesToShow, weather, descriptionCodeWMO } = prospes;
  if (countriesToShow.length === 1) {
    const capitalName = countriesToShow[0].capital[0];
    if (Object.keys(weather).length > 0) {
      return (
        <div>
          <h3>
            <strong>{`Weather in ${capitalName}`}</strong>
          </h3>
          <p>{`temperature ${weather.current.temperature_2m} ${weather.current_units.temperature_2m}`}</p>
          <p>{`${descriptionCodeWMO(weather.current.weather_code)}`}</p>
          <p>{`wind ${weather.current.wind_speed_10m} ${weather.current_units.wind_speed_10m}`}</p>
        </div>
      );
    }
  }
};

export default ShowWeather;
