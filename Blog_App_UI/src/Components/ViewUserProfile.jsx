import React, { useEffect, useState } from 'react'
import { Card, CardBody, Container, Row, Col, Table, CardFooter, Button } from 'reactstrap';
import { getCurrentUserDetails, isloggedin } from '../Auth';

const ViewUserProfile = ({user}) => {

    const [currentUser,setCurrentUser]=useState(null)
    const [login,setLogin]=useState(false)

    useEffect(()=>{
        setCurrentUser(getCurrentUserDetails());
        setLogin(isloggedin());

    },[])
  return (
    <Card className='border-0 mt-2 rouned-0 shadow-sm'>
            <CardBody>
              <h3 className='text-uppercase'>User Information</h3>
              <Container className='text-center'>
                <img style={{ maxWidth: '250px', maxHeight: '250px' }} src={user.image? user.image:''} alt='user profile picture' className='img-fluid rounded-circle'></img>
              </Container>

              <Table responsive striped hover border={true} className='text-center mt-5'>
                <tbody>
                  <tr>
                    <td>
                      UserId
                    </td>

                    <td>
                      {user.id}
                    </td>

                  </tr>

                  <tr>
                    <td>
                      User Name
                    </td>
                    <td>
                      LWCD{user.name}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      User Email
                    </td>
                    <td>
                      {user.email}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      About
                    </td>
                    <td>
                      {user.about}
                    </td>

                    <tr>
                    <td>
                      Role
                    </td>
                    <td>
                      {user.role.map((role)=>{
                        return(
                          <div><span key={role.id}>{role.name}</span></div>
                        )
                      })}
                    </td>
                  </tr>
                  </tr>
                </tbody>
              </Table>

              {currentUser ? (currentUser.id==user.id)?(<CardFooter>
                <Button color='warning' className='text-center'></Button>
              </CardFooter>):'':''}

            </CardBody>
          </Card>
  )
}

export default ViewUserProfile