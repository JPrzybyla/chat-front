import {Router} from "next/router";

import getCookieValue from "./getCookieValue";
import verifyToken from "./verifyToken";

const validateCookies = () => {
    if(getCookieValue('jwt')!==''){
        //cookie exist and verify if its our signature
        if(verifyToken('jwt')){
            console.log('dupaauth')
            //redirect user to chat page
        }
        //if auth token is not signed properly or expired
        else{
            //delete cookie
            document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

            //check if session cookie exists
            if(getCookieValue('session')!==''){
                //chceck if session cookie is signed properly
                if(verifyToken('session')){
                    //session token is okay generating a new jwt and redirecting user
                    console.log('dupasession')
                }
                else {
                    document.cookie = "session= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                    Router.push('/')
                }
            }
            else{
                //session token is not available
                Router.push('/')
            }
        }
    }
    //if auth token is not available chceck for session token and login user automatically
    else if(getCookieValue('session')){
        //cookie exist and verify if its our signature
        if(verifyToken('session')){
            console.log('dupasession')
            //generate a auth token and redirect
        }
        else {
            //session token is not correct
            document.cookie = "session= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            Router.push('/')
        }
    }
}

export default validateCookies