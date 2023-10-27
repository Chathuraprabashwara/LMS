'use client'
import React from 'react'
import Heading from '../Utils/Heading'
import AdminSideBar from '../Components/admin/Sidebar/AdminSideBar'
import AdminProtected from '../hooks/AdminProtected'

type Props = {}

const page = (props: Props) => {
  return (

    <div>
        <AdminProtected>
        <Heading
        title='Elearning - Admin'
        description='Elearning is a platform for students to learn and get help from teachers'
        keywords='programing, MERN,Redux,Machine Learning'
        />
        <div className="flex h-[2000vh]">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSideBar/>
            </div>
            <div className="w-[85%]">

            </div>


        </div>
        </AdminProtected>
    </div>
  )
}

export default page