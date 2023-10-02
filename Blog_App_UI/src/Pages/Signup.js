import React, { useState, useEffect } from "react";

import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../Components/Base";
import { signUp } from "../Services/user-service";
import {toast} from 'react-toastify';

const Signup=()=>{


    const [data,setData]=useState({
        email:'',
        password:'',
        name:'',
        about:''

    })

    const [error,setError]=useState({
        errors:{},
        isError:false

    })

    

    const handleChange=(event,property)=>{
        
        //dynamically setting the values
        setData({...data,[property]:event.target.value})
        
    }
     
    useEffect(()=>{
        console.log(data);
    },[data])

    const resetdata=()=>{
        setData({
        email:'',
        password:'',
        name:'',
        about:''
        })

    }

    const submitForm=(event)=>{
        event.preventDefault()

        /*if(error.isError){
            toast.error("Data is Invalid");
            return;
        }*/

        console.log(data);
        //data validate

        //fetch from api
        signUp(data).then((resp)=>{
            console.log(resp);
            console.log("Registration is Successful !! +User-Id ->"+resp.id);
            toast.success("Registration is Successful");
            setData({
                email:"",
                password:"",
                name:"",
                about:""
                 })
        }).catch((error)=>{
            console.log(error);

            console.log("Error Log");

            //handling Error.
            setError({
                errors:error,
                isError:true
            });
        });
    }


    return(
        <Base>
        
        <Container>
            <Row className="mt-5">

                {/*{JSON.stringify(data)}*/}
                <Col sm={{size:5,offset:3}}>
                <Card color="info" low inverse >
                    
                <CardHeader>
                    <h3>Fill these fields to Register</h3>
                </CardHeader>
                
                <CardBody>

                    {/*This is SignUp page body */}
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="name">Enter Name</Label>
                            <Input type='text' placeholder="Your Name Please!" id='name'
                             invalid={error.errors?.response?.data?.name? true:false} 
                            onChange={(e)=>handleChange(e,'name')} value={data.name}></Input>

                        <FormFeedback>
                            {error.errors?.response?.data?.name}
                        </FormFeedback>

                        </FormGroup>

                        


                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type='email' placeholder="Enter your Email!" id='email' 
                            invalid={error.errors?.response?.data?.email? true:false}
                            onChange={(e)=>handleChange(e,'email')} value={data.email}></Input>

                        <FormFeedback>
                            {error.errors?.response?.data?.email}
                        </FormFeedback>

                        </FormGroup>

                        

                        <FormGroup>
                            <Label for="password">Enter Password</Label>
                            <Input type='password' placeholder="Your Password!" id='password' 
                            invalid={error.errors?.response?.data?.password? true:false}
                            onChange={(e)=>handleChange(e,'password')} value={data.password}></Input>

                        <FormFeedback>
                            {error.errors?.response?.data?.password}
                        </FormFeedback>
                        </FormGroup>

                        

                        <FormGroup>
                            <Label for="about">About</Label>
                            <Input type='textarea' placeholder="About Yourself " 
                            invalid={error.errors?.response?.data?.about? true:false}
                            id='about' style={{height:"250px"}}
                             onChange={(e)=>handleChange(e,'about')} value={data.about}></Input>

                            <FormFeedback>
                                {error.errors?.response?.data?.about}
                            </FormFeedback>
                        </FormGroup>

                        

                        <Container className="text-center">
                            <Button  color="success" >Register</Button>
                            <Button color="dark" type="reset" onClick={resetdata} className="ms-2">Reset</Button>


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

export default Signup;