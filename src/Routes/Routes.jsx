import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AllClasses from "../Pages/AllClasses/AllClasses";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateRoutes from "./PrivateRoute/PrivateRoutes";
import TeachOn from "../Pages/TeachOn/TeachOn";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import PaymentConfirm from "../Pages/PaymentConfirm/PaymentConfirm";
import EnrollClass from "../Dashboard/EnrollClass/EnrollClass";
import Users from "../Dashboard/AdminDashboard/Users/Users";
import AdminPrivateRoute from "./AdminPrivateRoute/AdminPrivateRoute";
import TeacherRequest from "../Dashboard/AdminDashboard/TeacherRequest/TeacherRequest";
import AllClass from "../Dashboard/AdminDashboard/AllClass/AllClass";
import AddClass from "../Dashboard/TeacherDashboard/AddClass/AddClass";
import MyClass from "../Dashboard/TeacherDashboard/MyClass/MyClass";
import UpdateClass from "../Dashboard/TeacherDashboard/MyClass/UpdateClass";
import MyClassDetails from "../Dashboard/TeacherDashboard/MyClass/MyClassDetails";
import MyEnrollClassDetails from "../Dashboard/MyEnrollClassDetails/MyEnrollClassDetails";
import Profile from "../Dashboard/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/class/details/:id",
        element: (
          <PrivateRoutes>
            <ClassDetails></ClassDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/paymentConfirm/:id",
        element: (
          <PrivateRoutes>
            <PaymentConfirm></PaymentConfirm>
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/teachOn",
        element: (
          <PrivateRoutes>
            <TeachOn></TeachOn>
          </PrivateRoutes>
        ),
      },
      {
          path: '/profile',
          element : <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
      }
    ],
  },
  

  // dashboard
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/enrollClass",
        element: (
          <PrivateRoutes>
            <EnrollClass></EnrollClass>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myenroll-class/:id",
        element: <MyEnrollClassDetails></MyEnrollClassDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/my-enroll/${params.id}`)
      },
      // teacher related api
      {
        path: "/dashboard/addClass",
        element: (
          <AdminPrivateRoute>
            <AddClass></AddClass>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/myClass",
        element: (
          <AdminPrivateRoute>
            <MyClass></MyClass>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateClass/:id",
        element: (
          <AdminPrivateRoute>
            <UpdateClass></UpdateClass>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/myClass/:id",
        element: (
          <AdminPrivateRoute>
            <MyClassDetails></MyClassDetails>
          </AdminPrivateRoute>
        ),
      },

      // admin related route
      {
        path: "/dashboard/users",
        element: (
          <AdminPrivateRoute>
            <Users></Users>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/teachers",
        element: (
          <AdminPrivateRoute>
            <TeacherRequest></TeacherRequest>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/allClass",
        element: (
          <AdminPrivateRoute>
            <AllClass></AllClass>
          </AdminPrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
