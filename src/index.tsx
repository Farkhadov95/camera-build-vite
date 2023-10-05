import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './components/routes/routes';
import { store } from './store';
import {
  fetchCatalogDataAction,
  fetchPromoDataAction,
} from './store/catalog-data/catalog-data';
import { Provider } from 'react-redux';

store.dispatch(fetchCatalogDataAction());
store.dispatch(fetchPromoDataAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
