import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetails, isloggedin } from '../Auth'
import userContext from '../context/userContext'


export const Posts=({post={id:-1,title:"This is a Default post title",content:"This is a Default content"},deletePosts})=> {

  const userContextData=useContext(userContext);

  const[user,setUser]=useState(null)
  const[login,setLogin]=useState(null)

  useEffect(()=>{
    setUser(getCurrentUserDetails())
    setLogin(isloggedin())
    
  },[])
  return (
    <Card>
        <CardBody className='border-0 shadow-sm'>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{html:post.content.substring(0,70)+"...."}}>
                ...
            </CardText>

            <div>
                <Link color='info' className='btn btn-secondary border-0' to={'/posts/'+post.postId}>Read More</Link>

                {userContextData.user.login && (user && user.id === post.user.id) ? <Button color='danger' onClick={()=>deletePosts(post)} className='ms-2' >Delete</Button>:''}
                {userContextData.user.login && (user && user.id === post.user.id) ? <Button tag={Link} to={`/user/update-blog/${post.postId}`}  color='danger'  className='ms-2' >Update</Button>:''}
            </div>

        </CardBody>
    </Card>
  )
}

export default Posts