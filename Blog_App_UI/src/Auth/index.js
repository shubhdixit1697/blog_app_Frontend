//user is logged in
export const isloggedin=()=>{
    let data=localStorage.getItem("data");

    if(data!=null){
        return true;
    }
    else{
        return false;
    }
};

//set auth jwt token 

export const dologin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next()
};

// log out

export const dologout=(next)=>{
    localStorage.removeItem("data");
    next()
};


//get userdetails

export const getCurrentUserDetails=()=>{
    if(isloggedin()){
        return JSON.parse(localStorage.getItem('data')).user;
    }
    else{
        return undefined;
    }
};

export const getToken=()=>{

    if(isloggedin()){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return null;
    }


}