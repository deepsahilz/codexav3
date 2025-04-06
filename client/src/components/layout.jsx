import React from 'react'
import Nav from './nav'
import { useOutlet } from 'react-router-dom'
import PageLoader from './PageLoader'

const layout = () => {
  const outlet = useOutlet();
  if (!outlet) return <div>loading</div>;
  return (
    <>
    <Nav/>
    {outlet}
    </>
  )
}

export default layout