async function start(){
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherData = await weatherPromise.json();
  const floridaTemperature = weatherData.properties.periods[0].temperature;
  console.log(floridaTemperature);

  document.querySelector("#florida-temperature").textContent = floridaTemperature;
}

start()


