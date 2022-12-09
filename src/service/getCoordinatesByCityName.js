import axios from 'axios';

async function getCoordinatesByCityName(cityName) {
  try {
    const response = await axios.get(
      `https://eu1.locationiq.com/v1/search?key=pk.db75d992daae91d73be9e9aa5df7fcf1&q=${cityName}&format=json&limit=1`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default getCoordinatesByCityName;
