import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../Services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function CustomSideMenu() {

    const [categories,setCategories]=useState([])
    useEffect(()=>{

        loadAllCategories().then(data=>{
            setCategories([...data])
            console.log(data)
        }).catch(error=>{
            console.log(error)
            toast.error('Error in loading Categories')
        })

    },[])
  return (
    <div>
        <ListGroup>
            <ListGroupItem action={true} tag={Link} to='/' className='border-0'>
                All Blogs
            </ListGroupItem>

            {categories & categories.map((cat,index)=>{
                return(
                    <ListGroupItem action={true}  tag={Link} to={'/categories/'+cat.categoryId} key={index} className='border-0 shadow-0 margin-1'>
                    {cat.categoryTitle}
                    </ListGroupItem>

                )
            })}
        </ListGroup>
    </div>
  )
}

export default CustomSideMenu