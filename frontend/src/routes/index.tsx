import { RouteObject } from "react-router-dom";
import HomePage from "src/components/pages/home/home-page";
import NotFoundPage from "src/components/pages/not-found/not-found-page";
import OrderPage from "src/components/pages/order/order-page";
import ProductPage from "src/components/pages/product/product-page";
import Layout from "src/components/templates/layout/layout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "order", element: <OrderPage /> },
      { path: "product", element: <ProductPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
