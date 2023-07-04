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
  caption: 'Clients',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Clients',
      type: 'collapse',
      icon: icons.IconListNumbers,

      children: [
        {
          id: 'login3',
          title: 'List Client',
          type: 'item',
          url: '/clients/login/login3',
          target: true
        }
      ]
    }
  ]
};

export default clients;
