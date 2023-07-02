
import './App.css';
import { Route,Routes } from 'react-router-dom';
import LogIn from './register/LogIn';
import Register from './register/Register';
import Home from './components/Home';
import ViewGalleryPage from './components/ViewGalleryPage';
import CreateNewGalleryPage from './components/CreateNewGalleryPage';
import AuthorsGalleries from './components/AuthorsGalleries';
import MyGalleries from './components/MyGalleriesPage';


function App() {
  
  return (
    <Routes>
      <Route  index element={<Home />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/galleries/:id" element={<ViewGalleryPage />}></Route>
      <Route path="/create" element={<CreateNewGalleryPage/>}></Route>
      <Route path="/edit-gallery/:id" element={<CreateNewGalleryPage />} ></Route>
      <Route path="/authors/:id" element={<AuthorsGalleries />} ></Route>
      <Route path="/my-galleries" element={<MyGalleries />} ></Route>
    </Routes>

  );
}

export default App;
