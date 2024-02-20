import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import NotFound from "./pages/NotFound/NotFound";
import Layout from "./components/Layout/Layout";
import Welcome from "./pages/Welcome/Welcome";
import RequireAuth from "./components/RequireAuth/RequireAuth";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Movies = React.lazy(() => import("./pages/Movies/Movies"));
const Bookmarked = React.lazy(() => import("./pages/Bookmarked/Bookmarked"));
const TVSeries = React.lazy(() => import("./pages/TVSeries/TVSeries"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/bookmarked" element={<Bookmarked />} />
            <Route path="/tv-series" element={<TVSeries />} />
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
export default App;
