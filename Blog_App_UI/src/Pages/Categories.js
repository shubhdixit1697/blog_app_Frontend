import React, { useEffect, useState } from 'react'
import Base from '../Components/Base'
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from "reactstrap";
import CustomSideMenu from '../Components/CustomSideMenu';
import NewFeed from '../Components/NewFeed';
import { toast } from 'react-toastify';
import { loadpostcategorywise } from '../Services/post-service';
import Posts from '../Components/Posts';
import { deletePostbyId } from '../Services/post-service';

function Categories() {

    const [posts,setPosts]=useState([])

    const {categoryId}= useParams()

    useEffect(()=>{
        console.log(categoryId);
        loadpostcategorywise(categoryId).then(data=>{
            setPosts([...data])
            console.log(data)
        }).catch(error=>{
            console.log(error)
            toast.error("Error in Getting Posts by category")
        })
        
    },[categoryId])

    const deletePosts=(post)=>{

        deletePostbyId(post.postId).then(res=>{
          console.log(res)
          toast.success("Deleted Post")
          let newPosts=posts.filter(p=>p.postId!=post.postId)
          setPosts([...newPosts])
          
        }).catch(error=>{
          console.log(error)
          toast.error('Error in deleting posts')
        })
    
      }

  return (
    <Base>
        
        <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-3">
                <CustomSideMenu />
                </Col>

                <Col md={10}>
                    <h1>Blogs count ({posts.length})</h1>
                {
                    posts && posts.map((post,index)=>{

                        <Posts key={index} deletePosts={deletePosts} post={post}>

                        </Posts>

                    })
                }

                {posts.length<=0?<h1>No Blogs are avaialable for this Category</h1>:''}

                </Col>

            </Row>
        </Container>

        </Base>
  )
}

export default Categories