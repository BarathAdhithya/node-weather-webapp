const request = require("request");

const forecast = (lat, long, callback) => {
  const darkSkyURL =
    "https://api.darksky.net/forecast/05d4f02dc2a6b5ce6a12c3777f1787a6/" +
    lat +
    "," +
    long;
  console.log(darkSkyURL);
  request({ url: darkSkyURL, json: true }, (error, { body }) => {
    const { latitude } = body;
    const { summary } = body.hourly;
    const { precipProbability, temperature } = body.currently;
    if (error) {
      callback(error, undefined);
    } else if (latitude === undefined) {
      callback(error, undefined);
    } else {
      callback(
        undefined,
        "Now the temperature is " +
          Math.floor(((temperature - 32) * 5) / 9) +
          " degree. " +
          summary +
          ". with " +
          precipProbability +
          "% probability of rain"
      );
    }
  });
};

module.exports = forecast;
