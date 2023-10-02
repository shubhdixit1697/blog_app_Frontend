import axios from "axios";
import { getToken } from "../Auth";
 export const B_URL='http://localhost:9090';

export const myAxios=axios.create({

    baseURL:B_URL
    
});

export const privateAxios=axios.create({
    baseURL:B_URL
})

privateAxios.interceptors.request.use(config=>{

    const token='Bearer '+getToken();
    //console.log(token);

    if(token){
        config.headers['Authorization']=token;
        //config.headers['Access-Control-Allow-Origin']='*';
        //config.headers['Access-Control-Allow-Credentials']=true;

        return config
    }


},error=>Promise.reject(error))