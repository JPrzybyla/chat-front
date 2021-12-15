import axios from "axios";
import qs from 'qs';
import PBKDF2 from 'crypto-js/pbkdf2';
import sha256 from 'crypto-js/sha256';
import NodeRSA from "node-rsa";
import { v4 as uuidv4 } from 'uuid';

import ReactDOM from "react-dom";
import LoadingRegisterScreen from "../components/LoadingRegisterScreen";

const register = async (login, name, password, pin) => {

    //creating a key pair for user and storing it into local storage if user lose his private key it's over dla chłopa
    const key = new NodeRSA({b: 2048})
    const rsaPrivateKey = key.exportKey('pkcs8-private')
    const rsaPublicKey = key.exportKey('pkcs8-public')

    localStorage.setItem('rsa', rsaPrivateKey)

    const data = {
        login: sha256(PBKDF2(login, 'dupa').toString()).toString(),
        password: sha256(PBKDF2(password, 'dupa').toString()).toString(),
        name: name,
        pin: sha256(PBKDF2(pin, 'dupa').toString()).toString(),
        rsaPublicKey: rsaPublicKey,
        //generating random id for an user
        id: uuidv4()
    }

    const request = await axios.post('http://localhost:8080/register', qs.stringify(data))

    switch (request.status){
        case 201:
            ReactDOM.render(<LoadingRegisterScreen rsa={data.rsaPublicKey}/>, document.querySelector('#container'))
            break;
        case 200:
            alert('user with that credential already exists')
            break;
        case 500:
            alert('Db down')
            break;
    }

}
export default register;