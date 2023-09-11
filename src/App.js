import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Voucher from './components/Voucher';
import Login from './components/Login';
import Error from './components/Error';
import FrontPage from './components/FrontPage';
import Categories from './components/Categories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={ < FrontPage /> } />
        <Route path="/eezib" element={ <Landing/> } />
        <Route path="/categories/:id" element={ <Categories/> } />
        <Route path="/voucher" element={ <Voucher/> } />
        <Route path="*" element={ <Error /> } />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
