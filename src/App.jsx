import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
// import SingUp from './Components/SingUp';
import ProductImageZoom from './Components/ProductImageZoom';
// import Banner from './Components/Banner';
import SignUp from './Components/SingUp';
import Home from './Components/home/Home';
import Bannerss from './Components/Bannerss';
// import MegaMenu from './Components/MegaMenu';



const router = createBrowserRouter([

  {
    path:"/",
    element:<Home/>
  },

  
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/profile",
    element:<UserProfile/>
  },

  
  {
    path:'/img',
    element: <ProductImageZoom imageUrls={[
      'https://m.media-amazon.com/images/I/51rOB0+zr6L._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41gXKb8ruLL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/41vp+ldrTXL._SY300_SX300_.jpg'
    ]} />
  },
  


  
  
]);

function App() {
  const [count, setCount] = useState(0)

 return (
  <>
  
  <RouterProvider router={router} />
  
  </>
 )
}

export default App







