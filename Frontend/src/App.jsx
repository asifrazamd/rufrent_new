// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import FullDetailCard from "./views/FullDetailCard";
import InitialLandingPage from "./views/InitialLandingPage";
import FavoritesPage from "./views/FavoritesPageView";
import PostPropertiesView from "./views/PostPropertiesView";
import NotificationsView from "./views/NotificationsView";
import UserLandingView from "./views/UserLandingView";
import RecentlyViewedView from "./views/RecentlyViewedView";
import MyListingsView from "./views/MyListingsView";
import ProtectedRoute from "./controllers/ProtectedRotes";
import RMView from "./RmView/RmView";
import { UnauthorizeView } from "./views/UnauthorizeView";

import ProtectedRoute2 from "./components/ProtectedRoute2";
import routes from "./routes/routeConfig";

import "./App.css";

import ProfileView from "./views/ProfileView";
import NotfoundView from "./views/NotfoundView";
import FMView from "./FmView/FmView";
import Post from "./views/Post";
import MyComponent from "./views/a";



const App = () => {
  return (
    <Routes>
      {routes.map(({ path, component, roles }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute2 component={component} roles={roles} />}
        />
      ))}
      <Route path="/" element={<InitialLandingPage />} />
      <Route path="/user" element={<UserLandingView />} />
      <Route path="/fdc/:propertyId" element={<FullDetailCard />} />
      <Route path="/mylistings" element={<MyListingsView />} />
      <Route path="/favorites" element={<FavoritesPage />} />

      {/* <Route path="/postProperties" element={<PostPropertiesView />} /> */}
      <Route path="/postProperties" element={<Post />} />
      {/* <Route path="/postProperties" element={<MyComponent />} /> */}



      <Route path="/recentlyViewed" element={<RecentlyViewedView />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/notifications" element={<NotificationsView />} />
      <Route path="/rm" element={<RMView />} />
      <Route path="/fm" element={<FMView />} />
      <Route path="/unauthorize" element={<UnauthorizeView />} />
      <Route path="*" element={<NotfoundView />} />
    </Routes>
  );
};

export default App;
