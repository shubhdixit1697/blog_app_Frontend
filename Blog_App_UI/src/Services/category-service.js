import { myAxios } from "./Helper";

export const loadAllCategories=()=>{

    return myAxios.get('/api/categories/').then(response=>{return response.data})

}