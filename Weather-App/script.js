const searchBtn = document.getElementById('searchBtn');

async function weatherApi() {
  const place = document.getElementById('cityInput').value.trim();
  if (!place) {
    document.getElementById('weatherResult').innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const url = `https://weather-api167.p.rapidapi.com/api/weather/forecast?place=${place}%2CGB&cnt=3&units=standard&type=three_hour&mode=json&lang=en`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'becb3680bemsh2b3512dc98e8a03p15b5d8jsn924dbdd16c15', //  Put your real API key here
      'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
      Accept: 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result); // Always log first to understand structure

    // Build the HTML using the response
    const weatherHTML = `
      <h2>City: ${result.city.name}</h2>
      <div>
        <h3>Forecast for next hours:</h3>
        <p><strong>Time:</strong> ${result.list[0].dt_txt}</p>
        <p><strong>Summary:</strong> ${result.list[0].summery}</p>
        <p><strong>Temperature:</strong> ${(result.list[0].main.temprature - 273.15).toFixed(2)} °C</p>
        <p><strong>Weather:</strong> ${result.list[0].weather[0].description}</p>
        <p><strong>Humidity:</strong> ${result.list[0].main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${result.list[0].wind.speed} meter/sec</p>
      </div>
    `;

    document.getElementById('weatherResult').innerHTML = weatherHTML;

  } catch (error) {
    console.error(error);
    document.getElementById('weatherResult').innerHTML = `<p>Something went wrong fetching weather data!</p>`;
  }
}

searchBtn.addEventListener('click', weatherApi);
