import request from "postman-request";

const forcast = (latitude, longitude, callback) => {
  const weatherApiKey = "0ec7524bad9733e3fdacf8ed214f81fb";
  const weatherUrl = "http://api.weatherstack.com/current";
  const url = `${weatherUrl}?access_key=${weatherApiKey}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Error in the Weather API", undefined);
    } else if (response.body.error) {
      callback(response.body.error, undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

export default forcast;
