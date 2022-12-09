import { useState, useEffect } from 'react';
import { generateKey } from 'helpers';
import { getCoordinatesByCityName, getWeatherByCity } from 'service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const initialCitiesList = [
  {
    cityName: 'Berlin',
  },
  {
    cityName: 'Madrid',
  },
  {
    cityName: 'Paris',
  },
  {
    cityName: 'London',
  },
  {
    cityName: 'Kyiv',
  },
];

export const App = () => {
  const [citiesWeather, setCityWeather] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleChange = evt => {
    setInputValue(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const cityCheck = citiesWeather.find(city => city.cityName === inputValue);
    if (cityCheck) {
      console.log('this city is already in list');
      setInputValue('');
      return;
    }

    addCityWithWeather(inputValue, setCityWeather);
    setInputValue('');
  };

  useEffect(() => {
    let initialTimer = 0;

    const fetchInitialCoords = () => {
      initialCitiesList.map(async item => {
        setTimeout(
          async () => addCityWithWeather(item.cityName, setCityWeather),
          (initialTimer += 500)
        );
      });
    };

    fetchInitialCoords();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Container>
        <Container maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 500,
            }}
          >
            <TextField
              value={inputValue}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="cityName"
              label="city name"
              type="text"
              id="cityName"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add City
            </Button>
          </Box>
        </Container>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Current Temperature</TableCell>
                <TableCell align="right">Max Temperature</TableCell>
                <TableCell align="right">Min Temperature</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citiesWeather.map(item => (
                <TableRow
                  key={generateKey(item.cityName)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.cityName}
                  </TableCell>
                  <TableCell align="right">{item.currentTemp}</TableCell>
                  <TableCell align="right">{item.maxDailyTemp}</TableCell>
                  <TableCell align="right">{item.minDailyTemp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

const addCityWithWeather = async (cityName, setState) => {
  const cityCoords = await getCoordinatesByCityName(cityName);
  const weatherApiResponse = await getWeatherByCity(
    cityCoords.data[0].lat,
    cityCoords.data[0].lon
  );

  setState(prevState => [
    ...prevState,
    {
      cityName: cityName,
      currentTemp: weatherApiResponse.data.current_weather.temperature,
      maxDailyTemp: weatherApiResponse.data.daily.temperature_2m_max[0],
      minDailyTemp: weatherApiResponse.data.daily.temperature_2m_min[0],
    },
  ]);
};
