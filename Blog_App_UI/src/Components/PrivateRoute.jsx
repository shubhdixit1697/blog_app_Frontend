import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { isloggedin } from '../Auth';

const PrivateRoute=()=> {
  

    return isloggedin() ? <Outlet /> :<Navigate to={"/login"} ></Navigate>
    
}

export default PrivateRoute;