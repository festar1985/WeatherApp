const weatherForm = document.querySelector("form");
const inputElement = document.querySelector("input");

const parag01 = document.querySelector("#message01");
const parag02 = document.querySelector("#message02");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = inputElement.value;
  parag01.textContent = "Loading...";
  fetch(`http://localhost:3001/weather?address=${location}`)
    .then((response) => {
      response
        .json()
        .then((data) => {
          if (data) {
            const weather = data.forcast.current;
            parag01.textContent = data.location;
            parag02.textContent = `The weather is now ${weather.weather_descriptions[0]} with temperature ${weather.temperature}, but it feels like ${weather.feelslike}. The wind speed is ${weather.wind_speed}km/h`;
          } else {
            parag01.textContent = "Something went wrong";
            parag02.textContent = "";
          }
        })
        .catch((error) => {
          parag01.textContent = "Please specify an address";
          parag02.textContent = "";
        });
    })
    .catch((error) => {
      parag01.textContent = "This is not a valid address";
      parag02.textContent = "";
    });
});
