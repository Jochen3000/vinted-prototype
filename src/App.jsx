import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const Catalogue = lazy(() => import("./pages/Catalogue"));
const ItemDetail = lazy(() => import("./pages/ItemDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Catalogue />} />
          <Route path="/catalog" element={<Catalogue />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
