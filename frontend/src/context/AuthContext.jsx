import react from 'react'
import { createContext } from 'react'

export const authDataContext = createContext()

function AuthContext({children}) {

    let serverUrl = "http://localhost:8000"

    return (
      
        <div>
            <authDataContext.Provider value={{serverUrl}}>
                {children}

            </authDataContext.Provider>
        </div>
     
    )
}

export default AuthContext