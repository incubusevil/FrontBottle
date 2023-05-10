import { useState, createContext } from "react";
import jwt_decode from "jwt-decode";

export const UserContext = createContext({ user: {} });
export const NumberOfPosition = createContext();
export const OrderId = createContext();
export const OrderDetails = createContext({ orderDetails: {} });
export const Header = createContext({ header: {} });
export const ProfileId = createContext();

export const StackContext = (props) => {
  const token = jwt_decode(localStorage.getItem("token"));
  const [user, setUser] = useState(token);
  const [numberOfPosition, setNumberOfPosition] = useState(0);
  const [orderId, setOrderId] = useState();
  const [orderDetails, setOrderDetails] = useState({});
  const [header, setHeader] = useState("Operator Dashboard");
  const [profileId, setProfileId] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NumberOfPosition.Provider
        value={{ numberOfPosition, setNumberOfPosition }}
      >
        <OrderId.Provider value={{ orderId, setOrderId }}>
          <OrderDetails.Provider value={{ orderDetails, setOrderDetails }}>
            <Header.Provider value={{ header, setHeader }}>
              <ProfileId.Provider value={{ profileId, setProfileId }}>
                {props.children}
              </ProfileId.Provider>
            </Header.Provider>
          </OrderDetails.Provider>
        </OrderId.Provider>
      </NumberOfPosition.Provider>
    </UserContext.Provider>
  );
};
