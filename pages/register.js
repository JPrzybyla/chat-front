import style from '../styles/register.module.scss';
import register from "../scripts/register";
import {useRef, useState} from "react";
import ReactDOM from 'react-dom';


import LoadingRegisterScreen from '../components/LoadingRegisterScreen';

const Register = () => {

    const [message, setMessage] = useState('');


    const data = {
        login: useRef(),
        name: useRef(),
        password: useRef(),
        retypePassword: useRef(),
        pin: useRef()
    }
    const checkInputs = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const pinRegex = /^\d{4}$|^\d{6}$/;

        setMessage('');

        const dataFixed = {
            login: data.login.current.value,
            name: data.name.current.value,
            password: data.password.current.value,
            retypePassword: data.retypePassword.current.value,
            pin: data.pin.current.value
        }

        if(dataFixed.login===''||dataFixed.name===''||dataFixed.password===''||dataFixed.retypePassword===''||dataFixed.pin===''){
            setMessage('Please fill all blank spaces')
        }
        else{
            if(dataFixed.password===dataFixed.retypePassword){
                if(passwordRegex.test(dataFixed.password)){
                    if(pinRegex.test(dataFixed.pin)){
                        //finally if everything is ok send request to server
                        register(dataFixed.login, dataFixed.name, dataFixed.password, dataFixed.pin);
                    }
                    else{
                        setMessage("Pin requres at least 4 numbers and can't be longer than 6")
                    }
                }
                else{
                    setMessage("Password requires minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
                }
            }
            else{
                setMessage("Your passwords don't match!");
            }
        }
    }

    return(
        <div className={style.container}>
            <div className={style.insideContainer} id={'container'}>
                <input type={'text'} placeholder={'Login'} className={style.input} ref={data.login}/>
                <input type={'text'} placeholder={'Name'} className={style.input} ref={data.name}/>
                <input type={'password'} placeholder={'Password'} className={style.input} ref={data.password}/>
                <input type={'password'} placeholder={'Confirm password'} className={style.input} ref={data.retypePassword}/>
                <input type={'password'} placeholder={'Pin code'} className={style.input} ref={data.pin}/>
                <p className={style.error}>{message}</p>
                <button className={style.button} onClick={checkInputs}>Register</button>
            </div>
        </div>
    )
}

export default Register;