import React, { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { dologout, getCurrentUserDetails, isloggedin } from '../Auth';
import {useNavigate} from "react-router-dom";
import userContext from '../context/userContext';

function CustomNavbar(args) {

  const userContextData=useContext(userContext)

  let navigate=useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false);

  const [user, setUser] = useState(undefined);

  useEffect(() => {

    setLogin(isloggedin())
    setUser(getCurrentUserDetails())

  }, [login])

  const logout=()=>{
    dologout(()=>{
      setLogin(false)
      userContextData.setUser({
        data:null,
        login:false
      })
      navigate('/')

    })

  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <Navbar className='px-10' expand="md" fixed="" color="dark" dark {...args}>
        <NavbarBrand href="/">My Blog</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

            <NavItem>
              <NavLink tag={ReactLink} to="/newfeed">New Feed</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>

                <DropdownItem tag={ReactLink} to="/contactus">Contact Us</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>


                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>

            {
              login && (
                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                    Profile
                  </NavLink>

                  <NavLink onClick={logout}>
                    Logout
                  </NavLink>

                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem>
              )
            }

            {
              !login && (
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/signup">Sign Up</NavLink>
                  </NavItem>
                </>
              )
            }

          </Nav>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;