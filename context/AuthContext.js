import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useRouter } from 'next/router'


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(false)
    const router = useRouter()

    const token = authTokens?.refresh

    useEffect(() => {
            if(localStorage.getItem('authTokens')) {
                setAuthTokens(JSON.parse(localStorage.getItem('authTokens')))
                setUser(jwt_decode(localStorage.getItem('authTokens')))
            } else {
                setAuthTokens(null)
                setUser(null)
            } 
    }, [])

    let loginUser = async (e) => {
        e.preventDefault();
        let response = await fetch('https://asiqursswap.herokuapp.com/api/token/', {
        // let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if(response.status == 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            router.push('/')
        } else {
            alert('something went wrong')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        router.push('/login')

    }

    
    let updateToken = async () => {
        let response = await fetch('https://asiqursswap.herokuapp.com/api/token/refresh/', {
        // let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {

            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'refresh': refresh})
        })
        let data = await response.json()

        if(response.status == 200 ) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
        if(loading) {
            setLoading(false)
          }
    }


    useEffect(()=> {
        if(loading) {
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])


    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        authTokens:authTokens,
    }

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
