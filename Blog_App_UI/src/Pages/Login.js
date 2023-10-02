import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { dologin } from "../Auth";
import Base from "../Components/Base";
import { loginUser } from "../Services/user-service";
import {useNavigate} from "react-router-dom";
import userContext from "../context/userContext";

const Login=()=>{

    const userContxtData=useContext(userContext);

    const navigate=useNavigate()

    const [data,setData]=useState({
        email:'',
        password:''
    })

    const [LoginDetails,setLoginDetails]=useState({
        username:'',
        password:''
    })

    const handleChange=(event,field)=>{

        let actualValue=event.target.value

        setLoginDetails({
            ...LoginDetails,
            [field]:actualValue
        })

    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(LoginDetails);

        if(LoginDetails.username.trim()=='' || LoginDetails.password.trim()==''){

            toast.error("Username or Password is Empty");
            return;

        }

        //submit the data to server
        loginUser(LoginDetails).then((data)=>{
        
            console.log(data)
            //setData(data)

            dologin(data,()=>{
                console.log("Login Details is saved  to localstorage")
                /*userContxtData.setUser({
                    data:data.user,
                    login:true,
                })*/
            
            //redirect to user dashboard
                navigate("/user/dashboard")
            })
                toast.success("Login Successful")

        }).catch((error)=>{
            console.log("Login Error")
            if(error.response.status==400 || error.response.status==404 || error.response.status==500 || error.response.status==401){
                toast.error(error.response.data.message)
            }
            else{
                toast.error("Something Went Wrong at Login")

            }
            
        })
    }

    

    const handleReset= () =>{
        setLoginDetails({
            username:'',
            password:''
        })
    }

    return(
        <Base>
        
        <Container>
            <Row className="mt-5">
                <Col sm={{size:5,offset:3}}>
                <Card color="dark" low inverse >
                    
                <CardHeader className="text-center">
                    <h3>Login Page</h3>
                </CardHeader>
                
                <CardBody>

                    {/*This is SignUp page body */}
                    <Form onSubmit={handleFormSubmit}>
                        
                        <FormGroup>
                            <Label font-size="20" for="email">Email</Label>
                            <Input type='email' placeholder="Enter your Email!" 
                            onChange={(e)=>handleChange(e,'username')}
                            value={LoginDetails.username} id='email'></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Enter Password</Label>
                            <Input type='password' placeholder="Your Password!" 
                            onChange={(e)=>handleChange(e,'password')}
                            value={LoginDetails.password}  id='email'></Input>
                        </FormGroup>

                        <Container className="text-center">
                            <Button  color="success" >Login</Button>
                            <Button color="primary" type="reset" onClick={handleReset} className="ms-2">Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
            </Col>
            </Row>
        </Container>
        
        </Base>
    );
};

export default Login;