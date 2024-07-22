import {  createContext, useContext, useEffect, useState } from "react";


 const UserContext = createContext();



 export const UserProvider = ({children}) =>{


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "GET",
        });
  
        if (response.ok) {
          const data = await response.json();
          if(data.length > 0){
            setUser(data[data.length-1]);

          }
          setLoading(false)
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const resisterUser = async(userData)=>{

      try {
        const response = await fetch('http://localhost:3001/users' ,{
          method:"POST",
          headers:{
            'Content-Type':'application/json',

          },
          body:JSON.stringify(userData)
        });
        if(!response.ok){
          throw new Error("Failed to register user.");
        }

        fetchUserData();
      } catch (error) {
        setError(error)
        
      }

    }
  

    useEffect(()=>{
      fetchUserData()
    },[])


    return (
        <UserContext.Provider value={{user , loading , error ,resisterUser}}>
            {children}
        </UserContext.Provider>
    )

 }
 
 
 export const useProfile = () =>useContext(UserContext)




//  hellow