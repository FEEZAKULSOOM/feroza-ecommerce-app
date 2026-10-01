import react from 'react'
import { createContext } from 'react'

export const authDataContext = createContext()

let serverUrl= "http://localhost:8000"
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