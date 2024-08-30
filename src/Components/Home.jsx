import React from 'react'
import Navbar from '../Features/navbar/Navbar'
import ProductList from '../Features/product/Components/ProductList'
// import Navbar from './Navbar'

function Home() {
  return (
    <>
    <Navbar/>
    <ProductList/>
    <div className='flex h-[100vh] m-auto justify-center items-center '>
   <h1 className='text-6xl text-center font-extrabold'>Welcome to Upanah.com...</h1>
   </div>
   </>
  )
}

export default Home
