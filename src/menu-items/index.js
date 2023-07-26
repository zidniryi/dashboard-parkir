import clients from './clients';
import dashboard from './dashboard';
import transaction from './transaction';
import settings from './setting';
import places from './places';
import gates from './gates';
import master from './master';

// import utilities from './utilities';
// import other from './other';

// ==============================|| MENU ITEMS ||============================== //

// const menuItems = {
//   items: [dashboard, pages, utilities, other]
// };

const menuItems = {
  items: [dashboard, clients, places, gates, master, transaction, settings]
};

export default menuItems;
