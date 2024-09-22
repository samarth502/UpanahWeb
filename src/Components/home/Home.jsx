import React from 'react'
import Navbar from './components/Navbar'
import CategoryList from './components/CategoryList'
import BannerProduct from './components/BannerProduct'
import ProductList from './components/ProductList'



function Home() {
  return (
    <>
    <Navbar/>
    <CategoryList/>
    <BannerProduct/>
    <ProductList/>
    
   </>
  )
}

export default Home
