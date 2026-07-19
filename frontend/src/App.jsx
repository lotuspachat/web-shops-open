import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Login  from './pages/login/login.jsx';
import Resiter from './pages/login/resister.jsx';
import LoginSuccess from './pages/loginSubks.jsx';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginSucess" element={<LoginSuccess />} />
        {/* <Route path="/register" element={<Resiter />} /> */}
      </Routes>
    </BrowserRouter>
  );

}
export default App;