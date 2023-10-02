import Base from "../Components/Base";
import userContext from "../context/userContext";

const Services=()=>{

    return(
        <userContext.Consumer>
            {(user)=>(
                <Base>
                <h1>Service Page</h1>
                
                <h1>Wecome:{user.user.login && user.user.data.user.name}</h1>
                </Base>
            )}
        </userContext.Consumer>
    );
};

export default Services;