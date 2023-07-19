// assets
import {IconMap2} from '@tabler/icons';

// constant
const icons = {
  IconMap2
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const places = {
  id: 'places',
  title: 'Places',
  type: 'group',
  children: [
    {
      id: 'places1',
      title: 'Places',
      type: 'item',
      url: '/places/list-places',
      icon: icons.IconMap2,
      target: false
    }
  ]
};

export default places;
