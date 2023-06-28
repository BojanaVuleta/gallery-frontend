import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import LogIn from './register/LogIn';
import Register from './register/Register';
import { useContext } from 'react';
import UserContext from "./storage/UserContext";
import Home from './components/Home';
import ViewGalleryPage from './components/ViewGalleryPage';


function App() {
  const { signedIn } = useContext(UserContext);
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/galleries/:id" element={<ViewGalleryPage />}></Route>
      
    </Routes>

  );
}

export default App;
