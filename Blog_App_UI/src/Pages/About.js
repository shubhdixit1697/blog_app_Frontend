import { UNSAFE_RouteContext } from "react-router-dom";
import Base from "../Components/Base";
import userContext from "../context/userContext";

const About=() =>{

    return(

        <userContext.Consumer>
            {(object)=>(
                <Base>
                <h1>This is About Page</h1>
                <p>We are building Blogging aaplication</p>
                <p>Wecome:{object.user.login && object.user.data.user.name}</p>
                </Base>
            )}
        </userContext.Consumer>


    )

};

export default About;