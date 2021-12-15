import React from "react";
import style from '../styles/register.module.scss'

const LoadingRegisterScreen = ({rsaKey: rsa}) => {

    return(
            <div className={style.registerOk}>
                <h1>Register successful</h1>
                <p>Save your rsa key, without your private rsa key you wont be able to login to your account</p>
                <textarea>{rsaKey}</textarea>

            </div>
    )
}
export default LoadingRegisterScreen