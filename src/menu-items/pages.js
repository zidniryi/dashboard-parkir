// assets
import { IconMoneybag} from '@tabler/icons';

// constant
const icons = {
  IconMoneybag
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Transaksi',
  caption: 'Transaksi Parkir',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Transaksi',
      type: 'collapse',
      icon: icons.IconMoneybag,

      children: [
        {
          id: 'login3',
          title: 'Manual Mix',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Pembatalan Transaksi',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        },
        {
          id: 'register3',
          title: 'Gatei',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    }
  ]
};

export default pages;
