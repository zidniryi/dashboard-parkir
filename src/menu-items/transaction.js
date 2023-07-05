// assets
import {IconMoneybag} from '@tabler/icons';

// constant
const icons = {
  IconMoneybag
};

// ==============================|| EXTRA transaction MENU ITEMS ||============================== //

const transaction = {
  id: 'transaction',
  title: 'Transaksi',
  caption: 'Transaksi Parkir',
  type: 'group',
  children: [
    {
      id: 'transaction',
      title: 'Transaksi',
      type: 'collapse',
      icon: icons.IconMoneybag,

      children: [
        {
          id: 'trasaction1',
          title: 'Manual Mix',
          type: 'item',
          url: '/transaction/manualmix',
          target: false
        },
        {
          id: 'transaction2',
          title: 'Pembatalan Transaksi',
          type: 'item',
          url: '/transaction/register/register3',
          target: false
        },
        {
          id: 'transaction3',
          title: 'Gate',
          type: 'item',
          url: '/transaction/gate',
          target: false
        }
      ]
    }
  ]
};

export default transaction;
