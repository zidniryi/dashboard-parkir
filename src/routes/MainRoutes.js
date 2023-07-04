import {lazy} from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// Transaction
const ManualMix = Loadable(lazy(() => import('views/transaction/manual-mix/MahualMix')));

// Setting
const ParkingRates = Loadable(lazy(() => import('views/settings/parking-rates/ParkingRates')));
const FineRates = Loadable(lazy(() => import('views/settings/fine-rates/FineRates')));
const Membership = Loadable(lazy(() => import('views/settings/membership/Membership')));

// Clients
const ListClient = Loadable(lazy(() => import('views/clients/list-clients/ListClient')));
const AddClient = Loadable(lazy(() => import('views/clients/add-clients/AddClient')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'transaction',
      children: [
        {
          path: 'manualmix',
          element: <ManualMix />
        }
      ]
    },
    {
      path: 'settings',
      children: [
        {
          path: 'parking-rates',
          element: <ParkingRates />
        }
      ]
    },
    {
      path: 'settings',
      children: [
        {
          path: 'fine-rates',
          element: <FineRates />
        }
      ]
    },
    {
      path: 'settings',
      children: [
        {
          path: 'membership',
          element: <Membership />
        }
      ]
    },
    {
      path: 'clients',
      children: [
        {
          path: 'list-clients',
          element: <ListClient />
        }
      ]
    },
    {
      path: 'clients',
      children: [
        {
          path: 'add-client',
          element: <AddClient />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
