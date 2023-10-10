import { createBrowserRouter } from 'react-router-dom';
import Catalog from '../../pages/catalog/catalog';
import Product from '../../pages/product/product';
import NotFound from '../../pages/not-found/not-found';
import Basket from '../../pages/basket';

const router = createBrowserRouter([
  { path: '/', element: <Catalog /> },
  { path: '/product/:id', element: <Product /> },
  { path: '/basket', element: <Basket /> },
  { path: '*', element: <NotFound /> },
]);

export default router;
