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

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  const getIp = async () => {
    const response = await fetch('https://geolocation-db.com/json/');
    const data = await response.json();

    // alert(data.IPv4);
  };
  useEffect(() => {
    getIp();
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
