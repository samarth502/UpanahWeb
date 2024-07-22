import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import SingUp from './Components/SingUp';
import ProductImageZoom from './Components/ProductImageZoom';
import CameraCapture from './Components/CameraCapture';


const router = createBrowserRouter([


  {
    path: "/",
    element: <SingUp/>,
  },
  {
    path:"/home",
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
    path:"/pro",
    element:<CameraCapture/>
  },
  {
    path:'/img',
    element: <ProductImageZoom imageUrls={[
      'https://m.media-amazon.com/images/I/51rOB0+zr6L._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41gXKb8ruLL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/41vp+ldrTXL._SY300_SX300_.jpg'
    ]} />
  }
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







