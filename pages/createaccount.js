import router from 'next/router'
import React, {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Createaccount = () => {

    const router = useRouter()

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [passwordsdontmatch, setPasswordsdontmatch] = useState(false)
    const [uniqueissue, setUniqueissue] = useState(false)

    
    function SubmitButton(){
        if (password && email && confirmpassword && username){
          return (
            <div className="loginsubmit">
                <input type="submit" value="Sign Up" />
            </div>
        )
        } else {
          return (
            <div className="loginsubmitempty">
                <p>Sign Up</p>
            </div>
        )
        };
      };
    
    const verifyInfo = async (e) => {
        e.preventDefault();
        if(password === confirmpassword ){
            setPasswordsdontmatch(false)
            userCreated(e)
        } else {
            setPasswordsdontmatch(true)
        }
    }

    const userCreated = async (e) => {
        let formData = new FormData()
        formData.append("email", e.target.email.value)
        formData.append("username", e.target.username.value)
        formData.append("password", e.target.password.value)
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: "POST",
            body: formData
         })
        if(response.status === 400) {  
            setUniqueissue(true)
        } else {
            router.push({
                pathname: '/login',
                query: { from: 'usercreated' }
            })
        }
    }

    return (
        <div className="loginpage">
            <div className="loginform">
                <div className="loginheader">
                    <h3>Create Account</h3>
                </div>
                <div>
                    <form onSubmit={verifyInfo}>
                        {uniqueissue && <p>This email is already associated with an account. <Link href="/login">Log in</Link></p>}
                        <label>Email</label>
                        <br />
                        <input className="logininput" type="text" name="email" placeholder="Enter Email" autoComplete="off" onChange={ e => setEmail(e.target.value)}/>
                        <br />
                        <label>Username</label>
                        <br />
                        <input className="logininput" type="text" name="username" placeholder="Enter Username" autoComplete="off" onChange={ e => setUsername(e.target.value)}/>
                        <br />
                        <label>Password</label>
                        <br />
                        <input className="logininput" type="password" name="password" placeholder="Enter Password" autoComplete="off" onChange={ e => setPassword(e.target.value)}/>
                        <br />
                        <label>Confirm Password</label>
                        {passwordsdontmatch && <p>Passwords dont match</p>}
                        <br />
                        <input className="logininput" type="password" name="password2" placeholder="Confirm Password" autoComplete="off" onChange={ e => setConfirmpassword(e.target.value)}/>
                        <SubmitButton />
                        <div className="switchlog">
                            <Link href="/login">
                                <p>Have an account? Log in</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Createaccount
