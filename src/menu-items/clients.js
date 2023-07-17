// assets
import {IconListNumbers} from '@tabler/icons';

// constant
const icons = {
  IconListNumbers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const clients = {
  id: 'clients',
  title: 'Clients',
  type: 'group',
  children: [
    {
      id: 'clients1',
      title: 'List Client',
      type: 'item',
      url: '/clients/list-clients',
      icon: icons.IconListNumbers,
      target: false
    }
  ]
};

export default clients;
