import React , {useRef }from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import {loadUser} from "./flux/actions/auth";
import setAuthToken from "./utils/setAuthToken";

if(localStorage.token){
  setAuthToken(localStorage.token);
}
function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  },[])
 const {isLoading, isAuthenticated} = store.getState().auth;
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>       
        <Route exact path="/" ><Landing/></Route>
        <section className="container">
          <Alert/>
          <Switch>
            <Route path="/login" component={Login}></Route> 
            <Route path="/register" component={Register}></Route>
            <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>            
            <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>            
            <PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>            
            <PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>            
            <Route path="*"><h2>404 - Not Found</h2></Route>
          </Switch>
        </section>
      </Router>
    </Provider>
    
  );
}


export default App;
