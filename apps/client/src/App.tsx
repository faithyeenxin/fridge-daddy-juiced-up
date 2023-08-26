import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/utility/PrivateRoute';
import Account from './pages/Account';
import Recipes from './pages/Recipes';
import LearnMore from './pages/LearnMore';
import Home from './pages/Home';
import { Landing } from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import LoginRedirect from './pages/LoginRedirect';
import RegisterRedirect from './pages/RegisterRedirect';
import Aws_Test from './pages/Aws_Test';
import LoggedOutLayout from './components/layout/LoggedOutLayout';
import LoggedInLayout from './components/layout/LoggedInLayout';
import Testing from './pages/Testing';
import GroceriesList from './pages/GroceriesList';
import SingleRecipe from './pages/SingleRecipe';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* for all */}
        <Route path='/' element={<Landing />} />

        <Route path='/' element={<LoggedOutLayout />}>
          {/* <Route index element={<Landing />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/learn-more' element={<LearnMore />} />
          <Route path='/login-redirect' element={<LoginRedirect />} />
          <Route path='/register-redirect' element={<RegisterRedirect />} />
          <Route path='/aws-testing' element={<Aws_Test />} />
          <Route path='/testing' element={<Testing />} />
        </Route>

        {/* private routes */}
        <Route path='/' element={<PrivateRoute outlet={<LoggedInLayout />} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:id' element={<SingleRecipe />} />
          <Route path='/shopping-list' element={<GroceriesList />} />
          <Route path='/account' element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
