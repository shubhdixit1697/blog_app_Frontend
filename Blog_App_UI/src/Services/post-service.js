import { myAxios, privateAxios } from "./Helper"
import { getToken } from "../Auth";

const posttoserver=(postData)=>{

    //console.log(postData);
    return privateAxios.post(`/api/user/${postData.userId}/category/${postData.categoryId}/posts`,postData)
    .then((response)=>response.data)

};

export default posttoserver;

export const loadallposts=(pageNumber,pageSize)=>{
    return myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response=>(response.data));
}

export const getPostsbyId=(postId)=>{

    return myAxios.get(`/api/posts/`+postId).then((response)=>response.data);

}

export const createComment=(comment,postId)=>{
    return privateAxios.post(`/api/posts/${postId}/comments`).then((response)=>response.data)
}

export const uploadPostImage=(image,postId)=>{
    let formData=new FormData()
    formData.append("image",image)
    return privateAxios.post(`/api/posts/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((response)=>response.data)
}

export const loadpostcategorywise=(categoryId)=>{
    return privateAxios.get(`/api/category/${categoryId}/posts`).then(res=>res.data)
}

export const loadPostUserWise=(userId)=>{
    return privateAxios.get(`/api/user/${userId}/posts`).then(res=>res.data)

}

export const deletePostbyId=(postId)=>{
    return privateAxios.delete(`/api/posts/${postId}`).then(res=>res.data)
}

export const UpdatePostnow=(post,postId)=>{
    return privateAxios.put(`/api/posts/${postId}`,post).then(res=>res.data)
}

export const getUser=(userId)=>{
    return privateAxios.get(`/api/users/${userId}`).then(res=>res.data)
}