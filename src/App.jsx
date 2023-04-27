import { useEffect, useState } from "react";
import {createTheme, ThemeProvider,} from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LoginPage } from "./features/LoginPage";
import { AdminPanel } from "./features/AdminPanel";
import { ManagerPanel } from "./features/ManagerPanel";
import { OperatorPanel } from "./features/OperatorPanel";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

//move domain name in to global variable in configuration file
 
export default function App() {
  const [user, setUser] = useState(null); 
  const handleLogout= () => {
    localStorage.removeItem("token");
    setUser(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target?.[0].value;
    const password = event.target?.[2].value;
    axios.post("http://localhost:8080/rest/api/auth/login", {email, password})
          .then(response => {setUser(jwt_decode(response.data)) 
            localStorage.setItem('token', response.data)
          console.log(response.data)})
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    console.log("token check");
    if(savedToken){
        axios.get('http://localhost:8080/rest/api/auth/tokenCheck', {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }).then(setUser(jwt_decode(savedToken)));
      }
  }, []);
   
  const isUserAdmin = !!user?.role?.find(({authority})=> authority === 'ADMIN');

  const isUserOperator = !!user?.role?.find(({authority})=> authority === 'OPERATOR');

  const isUserManager = !!user?.role?.find(({authority})=> authority === 'MANAGER');

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {!user && <LoginPage handleSubmit={handleSubmit}/>}
        {isUserAdmin && <AdminPanel handleLogout={handleLogout}/>}
        {isUserOperator && <OperatorPanel handleLogout={handleLogout} user={user}/>}
        {isUserManager && <ManagerPanel handleLogout={handleLogout}/>}
      </ThemeProvider>
    </Router>
  )

}