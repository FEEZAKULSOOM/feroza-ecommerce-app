import react from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import  {authDataContext}  from './AuthContext.jsx'
import axios from 'axios'
import { useEffect } from 'react'

export const adminDataContext = createContext()

  

  function AdminContext({children}) {

    let [adminData , setAdminData] = useState("")
   let { serverUrl} = useContext(authDataContext)

   const getAdmin = async () => {
    try {
          let result = await axios.get(serverUrl + "/api/user/getadmin" , 
        {withCredentials: true})
        console.log(result.data)
        setAdminData(result.data)
    }
    catch (error) 
    {    
       setAdminData(null)
        console.log(error)
    }

   }

   useEffect(() => {
    getAdmin()
   }, [])
     let value = {
    adminData , setAdminData , getAdmin
}
  return (
    <adminDataContext.Provider value={value}>
        {children}
    </adminDataContext.Provider>
  )
}

 export default AdminContext
