import {useRoutes} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const isLogin = true;
const routes = isLogin ? MainRoutes : AuthenticationRoutes;
export default function ThemeRoutes() {
  return useRoutes([routes]);
}
