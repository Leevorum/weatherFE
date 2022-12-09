import axios from 'axios';

async function getWeatherByCity(latitude, longitude) {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max&daily=temperature_2m_min&timezone=GMT`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default getWeatherByCity;
