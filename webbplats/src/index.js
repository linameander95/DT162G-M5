import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Edit from "./pages/editGame";
import Nav from './components/Navbar';
import Header from './components/Header';
import ViewGames from "./pages/viewGames";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useParams, useNavigate, BrowserRouter, Link } from 'react-router-dom';
//rendering of the age using browserrouter, containing pages and components
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Nav />
  <Header />
<Routes>
<Route path="/" element={<ViewGames />}>
  </Route>
<Route path="edit/:id" element={<Edit />}>
  </Route>
</Routes>
  <React.StrictMode>
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
