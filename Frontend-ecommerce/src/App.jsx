import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './Context/cartContext';
import { FiltersProvider } from './Context/filterContext';
import { Profile } from './components/profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';
import MainContent from './components/frontpage/MainContent';
import AboutUs from './components/frontpage/about/About';
import Footer from './components/footer/Footer';
import Auth from './components/auth/Auth';
import ProductList from './components/products/ProductList/productList';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import AccessDenied from './components/protectedRoute/AccessDenied';
import NotFound from './components/notFound/notFound';
import Cart from './components/cart/Cart';
import ProfileCreate from './components/profile/profileCRUD/profileCreate';
import './App.css';

function App() {
  useEffect(() => {
    sessionStorage.getItem('access_token');
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="app">
          <Header />
          <main className="app__mainContent">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route
                path="/shop"
                element={
                    <CartProvider>
                      <FiltersProvider>
                        <ProductList />
                        <Cart />
                      </FiltersProvider>
                    </CartProvider>}/>
                    
              <Route path="/auth" element={<Auth />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="*" element={<NotFound />}/>
              <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
              <Route path="/profile-create" element={<ProtectedRoute component={ProfileCreate} />}/>
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
