import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
// import SingUp from './Components/SingUp';
import ProductImageZoom from './Components/ProductImageZoom';
import Banner from './Components/Banner';
import SearchBarWithCamera from './Components/SearchBarWithCamera';



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
  {
    path:'/banner',
    element:<Banner/>

  },
  {
    path:'/search',
    element:<SearchBarWithCamera/>

  }
  ,
  // {
  //   path:'/megamenus',
  //   element:<Navbar/>

  // }
  
  
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







