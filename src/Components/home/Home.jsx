import React from "react";
import Navbar from "./components/Navbar";
import CategoryList from "./components/CategoryList";
import BannerProduct from "./components/BannerProduct";
import ProductList from "./components/ProductList";
import VerticalCartProduct from "./components/VerticalCartProduct";
import LatestFashion from "./components/LatestFasion";

function Home() {
  return (
    <>
    
      <Navbar />
      <CategoryList />
      <BannerProduct />
      <VerticalCartProduct category={"footwear"} heading="popular brands shoes" />
      <ProductList />
      <LatestFashion/>
    </>
    //  up to date
  );
}

export default Home;
