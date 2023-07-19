// assets
import {IconDoor} from '@tabler/icons';

// constant
const icons = {
  IconDoor
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const gates = {
  id: 'gates',
  title: 'Gates',
  type: 'group',
  children: [
    {
      id: 'gates1',
      title: 'Gates',
      type: 'item',
      url: '/gates/list-gate',
      icon: icons.IconDoor,
      target: false
    }
  ]
};

export default gates;
