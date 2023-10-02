import { Card, CardBody, CardText, Col, Container, Input, Row ,Button} from 'reactstrap';
import Base from '../Components/Base';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createComment, getPostsbyId } from '../Services/post-service';
import { toast } from 'react-toastify';
import { B_URL } from '../Services/Helper';
import { isloggedin } from '../Auth';


const PostPage = () => {

    const { postId } = useParams()

    const [post, setPost] = useState(null)

    const [comment,setComment]=useState({
        comment:''
    })

    useEffect(() => {
        //Load post of PostId
        getPostsbyId(postId).then(data => {
            console.log(data)
            setPost(data)
        }).catch(error => {
            console.log(error)
            toast.error("Error in getting post by Id")
        })


    }, [])

    const printedDate = (numbers) => {
        return new Date(numbers).toLocaleDateString;
    }

    const submitComment=()=>{

        if(!isloggedin()){
            toast.error("Please Login First");
            return
        }
        if(comment.content.trim()===''){
            return
        }
        createComment(Comment,post.postId)
        .then(data=>{
            console.log(data)
            toast.success('Posted Comments')
            setPost({
                ...post,
                comments:[post.comments,data.data]
            })
        }).catch(error=>{
            console.log(error)
            toast.error("Error in posting comments")
        })

        setComment({
            comments:''
        })

    }
    return (
        <div>

            <Base>

                <Container className='mt-4'>
                    <Link to='/'>Home</Link> / {post && (<Link to=''>{post.title}</Link>)}

                    <Row>
                        <Col md={{
                            size: 12
                        }}>
                            <Card className='mt-3 ps-2 border-0'>

                                {
                                    (post) && <CardBody>
                                        <CardText>Posted by <b>{post.user.name}</b> <b>{printedDate(post.addedDate)}</b></CardText>


                                        <CardText className='mt-3'><h1>{post.title}</h1></CardText>

                                        <CardText className='text-muted'>{post.category.categoryTitle}</CardText>

                                        <div className='divider' style={{
                                            width:'50%',
                                            height:'1px',
                                            background:'#e2e2e2'
                                        }}>

                                        </div>

                                        <div className='image-container mt-3 shadow ' style={{ width: '60%' }}>
                                            <img className="img-fluid" src={B_URL + '/api/posts/image/' + post.imageName}></img>
                                        </div>

                                        <div>

                                            <CardText className='mt-5' dangerouslySetInnerHTML={{ __html: post.content }}></CardText>

                                        </div>

                                    </CardBody>
                                }
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{
                            size:9,
                            offset:1
                        }}>
                            <h3>Comments({post?post.comments.length:0})</h3>

                            {
                                post && post.comments.map((c,index)=>(
                                    <CardBody key={index} className='mt-2 border-0'>
                                        <CardText>

                                            <Input value={comment} type='textarea' placeholder='Your Comments'
                                            onChange={(event)=>setComment({comment:event.target.value})}></Input>

                                            <Button onClick={submitComment} className='mt-4' color='primary' type='submit'>Post Comment</Button>

                                        </CardText>
                                    </CardBody>
                                ))
                            }
                        </Col>
                    </Row>
                </Container>

            </Base>

        </div>
    )
}

export default PostPage;