import react from 'react'
import { createContext } from 'react'

export const authDataContext = createContext()

let serverUrl= "https://feroza-ecommerce-app-backend.onrender.com/"
let value ={
      serverUrl

}

function AuthContext({children}) {
    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext