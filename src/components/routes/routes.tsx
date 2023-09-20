import { createBrowserRouter } from 'react-router-dom';
import Catalog from '../../pages/catalog';
import Product from '../../pages/product';
import NotFound from '../../pages/not-found';

const router = createBrowserRouter([
  { path: '/', element: <Catalog /> },
  { path: '/product', element: <Product /> },
  { path: '*', element: <NotFound /> },
]);

export default router;
