// assets
import { IconListCheck } from '@tabler/icons';

// constant
const icons = {
  IconListCheck
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const master = {
  id: 'master',
  title: 'Master',
  caption: 'Master',
  type: 'group',
  children: [
    {
      id: 'master',
      title: 'Master',
      type: 'collapse',
      icon: icons.IconListCheck,

      children: [
        {
          id: 'master1',
          title: 'Category',
          type: 'item',
          url: 'master/category',
          target: false
        },
        {
          id: 'master2',
          title: 'Type',
          type: 'item',
          url: 'master/type',
          target: false
        }
      ]
    }
  ]
};

export default master;
