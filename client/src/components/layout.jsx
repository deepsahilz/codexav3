import React from 'react'
import Nav from './nav'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}

export default layout