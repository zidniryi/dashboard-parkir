// assets
import {IconSettings2} from '@tabler/icons';

// constant
const icons = {
  IconSettings2
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const settings = {
  id: 'settings',
  title: 'Settings',
  caption: 'Setting Parkir',
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      type: 'collapse',
      icon: icons.IconSettings2,

      children: [
        {
          id: 'settings1',
          title: 'Tarif Parkir',
          type: 'item',
          url: 'settings/parking-rates',
          target: false
        },
        {
          id: 'settings2',
          title: 'Tarif Denda',
          type: 'item',
          url: 'settings/fine-rates',
          target: false
        },
        {
          id: 'settings2',
          title: 'Billabel',
          type: 'item',
          url: 'settings/fine-rates',
          target: false
        },
        {
          id: 'settings2',
          title: 'Membership',
          type: 'item',
          url: 'settings/fine-rates',
          target: false
        }
      ]
    }
  ]
};

export default settings;
