import { Children } from "react";
import CustomNavbar from "./CustomNavbar";

const Base=({title="Welcome to this Page",children}) => {

    return(

        <div className="container-fluid p-0 m-0">

            <CustomNavbar />

            {children}


        </div>

    );

};

export default Base;