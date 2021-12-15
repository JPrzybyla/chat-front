import Link from "next/link";
import axios from "axios";
import qs from "qs";
import PBKDF2 from 'crypto-js/pbkdf2';
import sha256 from 'crypto-js/sha256';

import style from '../styles/index.module.scss';
import {useEffect, useRef, useState} from "react";

import getCookieValue from "../scripts/getCookieValue";
import verifyToken from '../scripts/verifyToken';
import validateCookies from "../scripts/validateCookies";


export default function Home() {

    //Check if cookie already exist if yes redirect to chat or login using session cookie
    useEffect(()=>{
        validateCookies()
    }, [])

    const [message, setMessage] = useState('');

    const login = useRef('');
    const password = useRef('');

    const loginUser = async () => {
        if(login.current.value!==''&&password.current.value!==''){
            const data = {
                login: sha256(PBKDF2(login.current.value, 'dupa').toString()).toString(),
                password: sha256(PBKDF2(password.current.value, 'dupa').toString()).toString()
            }

            const req = await axios.post('http://localhost:8080/login', qs.stringify(data))

            switch (req.status){
                case 401:
                    setMessage("Wrong login or password!")
                    break;
                case 500:
                    setMessage("Can't connect to database, please try again later")
                    break;
                case 200:
                    //creating a cookies (auth - 1 day, session - 7 days)
                    document.cookie = `jwt = ${req.data.jwt}; max-age=86400`
                    document.cookie = `session = ${req.data.session}; max-age=604800`
                    break;
            }

        }
        else
            setMessage("Please fill out form")
    }

    return (
      <div className={style.container}>
          <div className={style.insideContainer}>
              <input type={'text'} placeholder={'Login'} className={style.login} ref={login}/>
              <input type={'password'} placeholder={'Password'} className={style.password} ref={password}/>
              <p className={style.error}>{message}</p>
              <button className={style.button} onClick={loginUser}>Login</button>
              <p className={style.p}>Need an account? <Link href={'register'}><a className={style.link}>Register here.</a></Link></p>
          </div>
      </div>
  )
}
