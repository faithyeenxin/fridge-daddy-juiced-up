import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedInNavBar from "./components/utility/LoggedInNavBar";
import NavBar from "./components/utility/NavBar";
import PrivateRoute from "./components/utility/PrivateRoute";
import Account from "./pages/Account";
import AddCategory from "./pages/AddCategory";
import Recipes from "./pages/Recipes";
import Creators from "./pages/Creators";
import Home from "./pages/Home";
import { Landing } from "./pages/Landing";
import LearnMore from "./pages/LearnMore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddItem from "./pages/Add-Item";
import LoginRedirect from "./pages/LoginRedirect";
import RegisterRedirect from "./pages/RegisterRedirect";
import fetchAllData from "./components/utility/fetchAllData";
import parseJwt from "./components/utility/parseJwt";
import Example from "./pages/Example";
import { useAppDispatch } from "./app/store";
import { setToken, setUser } from "./app/slices/userSlice";
import { getItemsByUserId } from "./app/slices/itemsSlice";
import { fetchAllCategories } from "./app/slices/categoriesSlice";
import Aws_Test from "./pages/Aws_Test";

function App() {
  const token: any = sessionStorage.getItem("fridgeDaddyToken");
  const dispatch = useAppDispatch();
  console.log("page reloaded");
  return (
    <BrowserRouter>
      <Routes>
        {/* for all */}
        <Route path="/" element={<NavBar />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/login-redirect" element={<LoginRedirect />} />
          <Route path="/register-redirect" element={<RegisterRedirect />} />
          <Route path="/aws-testing" element={<Aws_Test />} />
        </Route>

        {/* private routes */}
        <Route path="/" element={<PrivateRoute outlet={<LoggedInNavBar />} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/account" element={<Account />} />
          <Route path="/example" element={<Example />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
