import request from "postman-request";

const geocode = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/"${address}.json`;
  const geoApiKey =
    "pk.eyJ1IjoiZmVzdGFyIiwiYSI6ImNrdzhiamI1djBjc2YydXMzN3dsZ3Y4eTYifQ.UgdM_114goAL3OHWwp25Cw";
  const url = `${geoUrl}?access_token=${geoApiKey}&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("No connection to the location service", undefined);
    } else if (response.body.features[0] === undefined) {
      callback("Not a valid input", undefined);
    } else {
      const data = response.body.features;
      callback(undefined, {
        latitude: data[0].center[1],
        longitude: data[0].center[0],
        location: data[0].place_name,
      });
    }
  });
};

export default geocode;
