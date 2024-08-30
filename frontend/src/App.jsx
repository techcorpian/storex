import { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './view/auth/Login';
import Register from './view/auth/Register';
import ProtectedRoute from './view/auth/ProtectedRoute';
import Dashboard from './view/dashboard/pages/Dashboard';
import FilesList from './view/filelist/pages/FileList';
import Projects from './view/project/pages/Projects';
import Folders from './view/folders/pages/Folders';
import './App.css'
import MainLayout from './view/shared/UIElements/MainLayout';
import ErrorPage from './view/shared/pages/ErrorPage';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Main-layout for protected routes */}

        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/home" element={<Dashboard />} />
          <Route path='/projects/folders/files/:id' element={<FilesList />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/folders/:id' element={<Folders />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default AppWrapper;
