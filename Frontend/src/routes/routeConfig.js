// src/routes/routeConfig.js
import UserLandingView from "../views/UserLandingView";
import RMView from "../RmView/RmView";
import FMView from "../FmView/FmView";

const routes = [
  // {
  //   path: "/user",
  //   component: UserLandingView,
  //   roles: ["User"],
  // },
  {
    path: "/rm",
    component: RMView,
    roles: ["RM"],
  },
  {
    path: "/fm",
    component: FMView,
    roles: ["FM"],
  },
  // {
  //   path: "/admin-dashboard",
  //   component: AdminDashboard,
  //   roles: ["Admin"],
  // },
  // {
  //   path: "/common-page",
  //   component: CommonPage,
  //   roles: ["User", "RelationshipManager", "FieldManager", "Admin"],
  // },
];

export default routes;
