import * as React from "react";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { UserContext } from "../StackContext";
import url from "../components/url";

export const LoadingPage = () => {
  const { user, setUser } = React.useContext(UserContext);
  console.log(user);
  const navigate = useNavigate();

  useEffect( () => {
    const savedToken = localStorage.getItem("token");
    console.log(savedToken);
    if (savedToken) {
      axios
        .get(url + "/rest/api/auth/tokenCheck", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        })
        .then(() => {
          const jwt = jwt_decode(savedToken);
          setUser(jwt);
          const isUserAdmin = !!user?.role?.find(
            ({ authority }) => authority === "ADMIN"
          );
          const isUserOperator = !!user?.role?.find(
            ({ authority }) => authority === "OPERATOR"
          );
          const isUserManager = !!user?.role?.find(
            ({ authority }) => authority === "MANAGER"
          );

          const isUserStoreman = !!redirect?.role?.find(
          ({ authority }) => authority === "STOREMAN"
        );
          
          isUserAdmin && navigate("/AdminPanel");
          isUserOperator && navigate("/OperatorPanel");
          isUserManager && navigate("/ManagerPanel");
          isUserStoreman && navigate("/StoremanPanel");
        }).catch(
          () => {
            navigate("/LoginPage")
          }
        );
    }
    else {
    const isUser = !user;
    isUser && navigate("/LoginPage");
    }
  }, [user]);

  return (
    <Container>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    </Container>
  );
};
