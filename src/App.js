/* eslint-disable no-unused-vars */
import {useSelector} from 'react-redux';

import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline, StyledEngineProvider} from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import {useEffect} from 'react';
import localKey from 'constant';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  function getMyLocation() {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          localStorage.setItem(localKey.latitude, position.coords.latitude);
          localStorage.setItem(localKey.longitude, position.coords.longitude);
        },
        (error) => {
          console.log('UserBlock Location');
          localStorage.setItem(localKey.latitude, -7.3965511);
          localStorage.setItem(localKey.longitude, 109.6982811);
        }
      );
    }
  }

  const getIp = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      localStorage.setItem(localKey.remoteip, data.ip);
    } catch (error) {
      console.log('Error Fetch Ip');
      localStorage.setItem(localKey.remoteip, '127.0.0.1');
    }
  };
  useEffect(() => {
    getIp();
    getMyLocation();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
