import React, { useContext, useState } from 'react'
import Base from '../Components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/userContext'
import { useEffect } from 'react'
import { Card, CardBody, Form, Input, Button, Label, Container } from 'reactstrap';
import { UpdatePostnow, loadallposts } from '../Services/post-service'
import { loadAllCategories } from '../Services/category-service'
import JoditEditor from 'jodit-react'
import { useRef } from 'react'
import { toast } from 'react-toastify'


const UpdateBlog=()=> {

    const [categories, setCategories] = useState([]);
    const editor = useRef(null)

    const {blogId}=useParams
    const object=useContext(userContext)
    const navigate=useNavigate()
    const [post,setPost]=useState(null)

    useEffect(()=>{

        loadAllCategories().then((data) => {
            //console.log(data)
            setCategories(data)
        }).catch(error => {
            console.log(error)
        })

        loadallposts(blogId).then(data=>{
            setPost({...data,categoryId:data.category.categoryId})

        }).catch(error=>{
            console.log(error)
        })
    },[])

    useEffect(()=>{
        if(!post){
            if(post.user.id !=object.user.data.id){
                toast.error("Not Your Blog")
                navigate('/')
            }
        }
    },[post])

    const handleChange=(event,fieldName)=>{
        setPost({
            ...post,[fieldName]:event.target.value
        })
    }

    const updatePost=(event)=>{
        event.preventDefault();
        console.log(post)
        UpdatePostnow({
            ...post,category:{categoryId:post.categoryId}
        },post.postId).then(res=>{
            console.log(res)
            toast.success("Updated Post")
        }).catch(error=>{
            console.log(error)
        })
    }

    const updateHtml=()=>{
        return(

            <div className="wrapper">

            <Card className='shadow-sm' border-0 mt-4>
                <CardBody>

                    {JSON.stringify(post)}

                    <Form onSubmit={updatePost}>

                        <h1>Update Your Blog</h1>

                        <div className="my-3" >
                            <Label for="title">Post Title</Label>
                            <Input type="text" name='title' id="title" className="rounded-10" placeholder='Type here'
                                onChange={(event)=>{handleChange(event,'title')}}
                            />
                        </div>

                        <div className="my-3">
                            <Label for="content" name='content'>Post Content</Label>
                            {/*<Input type="textarea" id="content" className="rounded-10" placeholder='Type here' style={{ height: '300px' }} />*/}

                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                name='content'
                                onChange={''}

                            >
                            </JoditEditor>

                            <div className="mt-3">
                                <Label>Select Post Banner</Label>
                                <Input type='file'
                                 onChange={newContent=>{setPost({...post,content:newContent})}}></Input>
                            </div>
                        </div>

                        <div className="my-3">
                            <Label for="content" color='dark'>Post Category</Label>
                            <Input type="select" id="category" 
                                name='categoryId'
                                onChange={''}
                                className="rounded-10" placeholder='Select Category'
                                value={post.categoryId}
                                >

                                <option disabled value={0}> ---Select Category--- </option>

                                {
                                    categories.map((category) => (
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitleString}
                                        </option>
                                    ))
                                }
                            </Input>
                        </div>

                        <Container className='text-center'>
                            <Button type='submit' className='rounded-10 md-2' color='primary' >Update Post</Button>
                            <Button className='rounded-10 ms-2' type='reset' color='danger' >Reset</Button>
                        </Container>

                    </Form>

                </CardBody>
            </Card>

        </div>
            
        )
    }

  return (
    <Base>

    <Container>
    {post && updateHtml()}
    </Container>

    </Base>
  )
}

export default UpdateBlog