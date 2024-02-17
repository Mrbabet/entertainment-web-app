import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Bookmarked from "./pages/Bookmarked/Bookmarked";
import TVSeries from "./pages/TVSeries/TVSeries";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Layout from "./components/Layout/Layout";
import Welcome from "./pages/Welcome/Welcome";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/welcome" element={<Welcome />} />

          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
          <Route path="/tv-series" element={<TVSeries />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            {/* Ready to add protected Routes */}
          </Route>
          {/* 404 */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
