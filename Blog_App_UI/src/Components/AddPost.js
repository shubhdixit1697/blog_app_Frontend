import { useEffect, useRef, useState } from 'react';
import { Card, CardBody, Form, Input, Button, Label, Container } from 'reactstrap';
import { loadAllCategories } from '../Services/category-service';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import posttoserver, { uploadPostImage } from '../Services/post-service';
import { getCurrentUserDetails } from '../Auth';


const AddPost = () => {

    const editor = useRef(null)

    // const [content,setContent]=useState('')

    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: -1
    })

    const [image,setImage]=useState(null);

    const fieldchanged = (event) => {
        //console.log(event.target.name)
        setPost({ ...post, [event.target.name]: event.target.value })

    }

    const contentfeildchanged = (data) => {
        console.log(data)
        setPost({ ...post, 'content': data })
    }



    {/*const config={
        placeholder:'Start typing'
    }*/}

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        setUser(getCurrentUserDetails())
        loadAllCategories().then((data) => {
            //console.log(data)
            setCategories(data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const createPost = (event) => {

        event.preventDefault();
        toast.success("Post Created")

        if (post.title.trim() === '') {
            toast.error('Please Enter Title')
            return;
        }

        if (post.content.trim() === '') {
            toast.error('Please Enter Content')
            return;
        }

        if (post.categoryId === '') {
            toast.error('Please Enter Title')
            return;
        }

        post['userId'] = user.id
        posttoserver(post).then(data => {

            uploadPostImage(image,data.postId).then((data)=>{
                toast.success('Image Uploaded!!')
            }).catch((error)=>{
                toast.error("Error in uploading Image")
                console.log(error)
            })


            toast.success('Created Post')
            setPost({

                title: '',
                content: '',
                categoryId: -1

            })
            //console.log(post)
        }).catch(error => {
            toast.error('Error')
            console.log(error)
        })

    }

    const handlefilesubmit=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    return (
        <div className="wrapper">

            <Card className='shadow-sm' border-0 mt-4>
                <CardBody>

                    {JSON.stringify(post)}

                    <Form onSubmit={createPost}>

                        <h1>Something On your Mind goes here</h1>

                        <div className="my-3" >
                            <Label for="title">Post Title</Label>
                            <Input type="text" name='title' id="title" className="rounded-10" placeholder='Type here'
                                onChange={fieldchanged}
                            />
                        </div>

                        <div className="my-3">
                            <Label for="content" name='content'>Post Content</Label>
                            {/*<Input type="textarea" id="content" className="rounded-10" placeholder='Type here' style={{ height: '300px' }} />*/}

                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                name='content'
                                onChange={(newContent)=>contentfeildchanged(newContent)}

                            >
                            </JoditEditor>

                            <div className="mt-3">
                                <Label>Select Post Banner</Label>
                                <Input type='file' onChange={handlefilesubmit}></Input>
                            </div>
                        </div>

                        <div className="my-3">
                            <Label for="content" color='dark'>Category</Label>
                            <Input type="select" id="category" value='category'
                                name='categoryId'
                                onChange={fieldchanged}
                                className="rounded-10" placeholder='Select Category'
                                defaultValue={0}>

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
                            <Button type='submit' className='rounded-10 md-2' color='primary' >Share Post</Button>
                            <Button className='rounded-10 ms-2' type='reset' color='danger' >Reset</Button>
                        </Container>

                    </Form>

                </CardBody>
            </Card>

        </div>
    )

}

export default AddPost;