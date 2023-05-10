import { LoginPage } from "./features/LoginPage";
import { AdminPanel } from "./features/admin/AdminPanel";
import { LoadingPage } from "./features/LoadingPage";
import { ManagerPanel } from "./features/manager/ManagerPanel";
import { OperatorPanel } from "./features/operator/OperatorPanel";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateOrder from "./components/operator/CreateOrder";
import CustomersOrder from "./components/operator/CustomersOrder";
import CurrentOrder from "./components/operator/CurrentOrder";
import OperatorPanelOrders from "./components/operator/OperatorPanelOrders";
import { StackContext } from "./StackContext";
import OperatorDashboard from "./components/operator/OperatorDashboard";
import { CurrentOrderNotFount } from "./components/operator/CurentOrderNotFound";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <StackContext>
          <Routes>
            <Route exact path="/" element={<LoadingPage />} />
            <Route exact path="/LoginPage" element={<LoginPage />} />
            <Route exact path="/AdminPanel" element={<AdminPanel />} />
            <Route exact path="/OperatorPanel" element={<OperatorPanel />}>
              <Route
                path="/OperatorPanel/OperatorDashboard"
                element={<OperatorDashboard />}
              />
              <Route
                path="/OperatorPanel/CustomersOperatorPanel"
                element={<OperatorPanelOrders />}
              />
              <Route
                exact
                path="/OperatorPanel/CreateOrder"
                element={<CreateOrder />}
              />
              <Route
                path="/OperatorPanel/CustomersOrder"
                element={<CustomersOrder />}
              />
              <Route
                path="/OperatorPanel/CurrentOrder"
                element={<CurrentOrder />}
              />
              <Route
                path="/OperatorPanel/CurrentOrderNotFound"
                element={<CurrentOrderNotFount />}
              />
            </Route>
            <Route exact path="/ManagerPanel" element={<ManagerPanel />} />
          </Routes>
        </StackContext>
      </BrowserRouter>
    </>
  );
}
