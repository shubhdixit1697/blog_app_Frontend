import React, { useEffect, useState } from 'react';
import Base from "./Base";
import { loadallposts } from '../Services/post-service';
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import Posts from './Posts';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { deletePostbyId } from '../Services/post-service';

const NewFeed = () => {

  const [postContent, setPostContent] = useState(
    {
      content: [],
      totalPages: '',
      totalElements: '',
      pageSize: '',
      lastPage: false,
      pageNumber: ''
    }
  )

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {

    //fetch all posts
    {/*loadallposts(0,5).then((data)=>{
      console.log(data)
      setPostContent(data)
    }).then((error)=>{

      console.log(error)
    })*/}

    changePage(currentPage);

  }, [currentPage])

  const changePage = (pageNumber = 0, pageSize = 5) => {


    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }

    if (pageNumber < postContent.pageNumber && postContent.lastPage == 0) {
      return;
    }
    loadallposts(pageNumber, pageSize).then(data => {
      setPostContent({
        content: [...postContent.content, ...data.content],
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        pageSize: data.pageSize,
        lastPage: data.lastPage,
        pageNumber: data.pageNumber
      })

      window.scroll(0, 0)
    }).catch(error => {
      console.log(error)
      toast.error('Error in Loading post')
    })
  }

  const deletePosts=(post)=>{

    deletePostbyId(post.postId).then(res=>{
      console.log(res)
      toast.success("Deleted Post")
      let newPostsContent=postContent.content.filter(p=>p.postId!=post.postId)
      setPostContent({...postContent,content:newPostsContent})
    }).catch(error=>{
      console.log(error)
      toast.error('Error in deleting posts')
    })

  }

  const changePageInfinite = () => {

    console.log("Page Changed")
    setCurrentPage(currentPage + 1)

  }

  return (

    <Base>

      <div className="container-fluid">
        <Row>
          <Col md={

            {
              size: 12
            }

          }>

            <h1>Blogs Content ({postContent?.totalElements})</h1>

            <InfiniteScroll
              dataLength={postContent.content.length}
              next={changePageInfinite}
              hasMore={!postContent.lastPage}

              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }

            >

              {
                postContent.content.map((post) => (
                  <Posts post={post} key={post.postId} deletePosts={deletePosts}></Posts>
                ))
              }

            </InfiniteScroll>


            {/**/}

            <Container className='text-center mt-5'>

              <Pagination size='lg'>
                <PaginationItem onClick={() => { changePage(1 - postContent.pageNumber) }} disabled={postContent.pageNumber == 0}>
                  <PaginationLink previous>
                    previous
                  </PaginationLink>
                </PaginationItem>

                {
                  [...Array(postContent.totalPages)].map((item, index) =>

                  (
                    <PaginationItem onChange={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                      <PaginationLink>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                  )
                }


                <PaginationItem onClick={() => { changePage(postContent.pageNumber + 1) }} disabled={postContent.lastPage}>
                  <PaginationLink next>
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>

            </Container>


          </Col>
        </Row>
      </div>

    </Base>
  );
};

export default NewFeed