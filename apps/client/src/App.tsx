import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedInNavBar from "./components/utility/LoggedInNavBar";
import PrivateRoute from "./components/utility/PrivateRoute";
import Account from "./pages/Account";
import AddCategory from "./pages/superceeded/AddCategory";
import Recipes from "./pages/Recipes";
import Creators from "./pages/Creators";
import Home from "./pages/Home";
import { Landing } from "./pages/Landing";
import LearnMore from "./pages/LearnMore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddItem from "./pages/superceeded/Add-Item";
import LoginRedirect from "./pages/LoginRedirect";
import RegisterRedirect from "./pages/RegisterRedirect";
import Example from "./pages/Example";
import Aws_Test from "./pages/Aws_Test";
import LoggedOutLayout from "./components/utility/LoggedOutLayout";
import LoggedInLayout from "./components/utility/LoggedInLayout";
import Testing from "./pages/Testing";
import GroceriesList from "./pages/GroceriesList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* for all */}
        <Route path="/" element={<LoggedOutLayout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/login-redirect" element={<LoginRedirect />} />
          <Route path="/register-redirect" element={<RegisterRedirect />} />
          <Route path="/aws-testing" element={<Aws_Test />} />
          <Route path="/testing" element={<Testing />} />
        </Route>

        {/* private routes */}
        <Route path="/" element={<PrivateRoute outlet={<LoggedInLayout />} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/shopping-list" element={<GroceriesList />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
