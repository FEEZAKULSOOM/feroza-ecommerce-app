import react, { useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { authDataContext } from './AuthContext'
import { useEffect } from 'react'
import axios from 'axios'
 export const userDataContext = createContext()


 function UserContext( {children} ) {
    let [userData , setUserData] =useState("")
    let{ serverUrl} = useContext(authDataContext)


      const getCurrentUser = async () => {
        try {
          let response = await axios.get(serverUrl +"/api/user/getcurrentuser " , 
             {
               withCredentials: true
             }
          
            
          );
              setUserData(response.data)
              console.log(response.data)
      
        } catch (error) {
            setUserData(null)
          console.error("Error in getCurrentUser:", error);
          return null;
        }
    }


    useEffect(() => {
        getCurrentUser()
    }, [])


    let value = {
        userData , 
        getCurrentUser,
        setUserData

    }
  
  return (
    <div>
       <userDataContext.Provider value={value}>
                {children}

            </userDataContext.Provider>
        
      
    </div>
  )
}
export default UserContext
