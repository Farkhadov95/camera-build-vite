import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './components/routes/routes';
import { store } from './store';
import { fetchCatalogData } from './reducers/catalog-data';

store.dispatch(fetchCatalogData());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
