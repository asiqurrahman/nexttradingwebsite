import router from 'next/router'
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Loading from '../components/Loading'

const Login = () => {

    let {loginUser, user, failedlogin, submitted} = useContext(AuthContext)

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userCreated, setUserCreated] = useState(false)

    const router = useRouter()
    const usercreated = router.query.from 

    useEffect(() => {
      if(usercreated == "usercreated"){
        setUserCreated(true)
      }
    }, [usercreated])

    if(user) {
        router.push('/')
    }

    function SubmitButton(){
        if (password && email){
          return (
            <div className="loginsubmit">
                <input type="submit" value="Sign In" />
            </div>
        )
        } else {
          return (
            <div className="loginsubmitempty">
                <p>Sign in</p>
            </div>
        )
        };
      };
    return (
        <div className="loginpage">
            {submitted && 
            <Loading />
            }
            {usercreated && <p className="accountcreated">Account Created, Please login</p>}
            <div className="loginform">
                <div className="loginheader">
                    <h3>Sign in</h3>
                </div>
                <div>
                    <form onSubmit={loginUser}>
                        {failedlogin && <p>Email or Password is incorrect</p>}
                        <label>Email</label>
                        <br />
                        <input className="logininput" type="email" name="email" placeholder="Enter Email" onChange={ e => setEmail(e.target.value)}/>
                        <br />
                        <label>Password</label>
                        <br />
                        <input className="logininput" type="password" name="password" placeholder="Enter Password" onChange={ e => setPassword(e.target.value)}/>
                        <br />
                        <SubmitButton />
                        <div className="switchlog">
                            <Link href="/createaccount">
                                <p>Need an Account? Create Account</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login


{/* <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit"/>
            </form> */}