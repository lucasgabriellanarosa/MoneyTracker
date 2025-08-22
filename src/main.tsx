import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './pages/Layout/Layout.tsx';
import Reports from './pages/Reports/Reports.tsx';
import Categories from './pages/Categories/Categories.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Login from './pages/Login/Login.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      
      <Route path='/login' element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
