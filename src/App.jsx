import { useEffect, useState } from "react";
import {createTheme, ThemeProvider,} from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LoginPage } from "./features/LoginPage";
import AdminDashboard from "./features/AdminPanel";
import ManagerDashboard from "./features/ManagerPanel";
import CustomerDashboard from "./features/CustomerHome";
import { Login } from "@mui/icons-material";

const theme = createTheme();
 
export default function App() {
  const [user, setUser] = useState(null);

  // const [token, setToken] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target?.[0].value;
    const password = event.target?.[2].value;
    axios.post("http://localhost:8080/rest/api/auth/login", {email, password})
          .then((response) => setUser(jwt_decode(response.data)));
  };


  // useEffect(() => {
  //   const savedToken = localStorage.getItem('token');
  //   if (savedToken) {
  //     setToken(savedToken);
  //   }
  // }, []);

  // const handleLogout = () => {
  //   setToken('');
  //   localStorage.removeItem('token');
  // };

  

    // const handleProtectedResource = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8080/rest/api/auth/tokneAuthorization', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }).then((response) => setUser(jwt_decode(response.data)));
    //     console.log(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

  const isUserAdmin = !!user?.role?.find(({authority})=> authority === 'ADMIN');

  // const isTokenAvailable = token !== '';

  // const isTokenExpired = !!user?.role?.find(({authority})=> authority === 'tokenexpred');

  const isUserCustomer = !!user?.role?.find(({authority})=> authority === 'CUSTOMER');

  const isUserManager = !!user?.role?.find(({authority})=> authority === 'MANAGER');

  // const isCredentialsTrue = !!user?.role?.find(({authority})=> authority === 'credentials');

  return (
    <ThemeProvider theme={theme}>
      {!user && <LoginPage handleSubmit={handleSubmit}></LoginPage>}
      {isUserAdmin && <AdminDashboard></AdminDashboard>}
      {isUserCustomer && <CustomerDashboard></CustomerDashboard>}
      {isUserManager && <ManagerDashboard></ManagerDashboard>}
    </ThemeProvider>
  )

}