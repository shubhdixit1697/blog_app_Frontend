import React, { useState,useEffect } from 'react'
import Base from '../../Components/Base';
import userContext from '../../context/userContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../Services/post-service';
import { Card, CardBody, Container, Row, Col, Table } from 'reactstrap';
import ViewUserProfile from '../../Components/ViewUserProfile';

function ProfileInfo() {

  const object = useContext(userContext)

  const { userId } = useParams();

  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser(userId).then(data => {
      console.log(data)
      setUser({ ...data })
    })
  }, [])

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <ViewUserProfile user={user}/>
        </Col>
      </Row>
    )
  }

  return (
    <Base>

      {user?userView():'Loading user data...'}

    </Base>
  )
}

export default ProfileInfo;