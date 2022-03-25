import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path='/'
          exact
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route
          path='/product-info/:productId'
          exact
          element={
            <ProtectedRoutes>
              <ProductInfo />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/cart'
          exact
          element={
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/orders'
          exact
          element={
            <ProtectedRoutes>
              <OrderPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/admin'
          exact
          element={
            <ProtectedRoutes>
              <AdminPage />
            </ProtectedRoutes>
          }
        />
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};
