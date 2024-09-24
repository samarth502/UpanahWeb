import React from 'react'
import Navbar from './components/Navbar'
import CategoryList from './components/CategoryList'
import BannerProduct from './components/BannerProduct'
import ProductList from './components/ProductList'
import VerticalCartProduct from './components/VerticalCartProduct'



function Home() {
  return (
    <>
    <Navbar/>
    <CategoryList/>
    <BannerProduct/>
    <VerticalCartProduct category={'beauty'} heading='popular brands shoes'/>
    <ProductList/>
    
   </>
  )
}

export default Home
