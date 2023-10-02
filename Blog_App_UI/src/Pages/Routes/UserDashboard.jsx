import React, { useEffect, useState } from 'react'
import Base from '../../Components/Base'
import AddPost from '../../Components/AddPost';
import { Container } from 'reactstrap';
import NewFeed from '../../Components/NewFeed';
import { getCurrentUserDetails } from '../../Auth';
import { deletePostbyId, loadPostUserWise } from '../../Services/post-service';
import { toast } from 'react-toastify';
import Posts from '../../Components/Posts';

const UserDashboard=()=> {

  const[user,setUser]=useState({})
  const[posts,setPosts]=useState([])

  useEffect(()=>{
    setUser(getCurrentUserDetails())
    loadPostData()
    

  },[])

  const loadPostData=()=>{
    loadPostUserWise(getCurrentUserDetails().id).then(data=>{
      console.log(data)
      setPosts([...data])
      toast.success("")
    }).catch(error=>{
      console.log(error)
      toast.error("Error in Loading Posts")
    })
  }

  const deletePosts=(post)=>{

    deletePostbyId(post.postId).then(res=>{
      console.log(res)
      toast.success("Deleted Post")
      let newPosts=posts.filter(p=>p.postId!==post.postId)
      setPosts([...newPosts])

    }).catch(error=>{
      console.log(error)
      toast.error('Error in deleting posts')
    })

  }

  return (
    <Base>

      <Container>
        <AddPost />

        <h1 className='mt-3'>Posts Count: ({posts.length}) </h1>
        {
          posts && posts.map((post,index)=>{
            return(
              <Posts post={post} key={index} deletePosts={deletePosts}>

              </Posts>
            )
          })
        }
      </Container>

      <NewFeed />

    </Base>
  )
}

export default UserDashboard;