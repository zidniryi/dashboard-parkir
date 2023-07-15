import {useRoutes} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import localKey from 'constant';

// ==============================|| ROUTING RENDER ||============================== //

const isLogin = localStorage.getItem(localKey.sessionid);

const routes = isLogin ? MainRoutes : AuthenticationRoutes;
export default function ThemeRoutes() {
  return useRoutes([routes]);
}
