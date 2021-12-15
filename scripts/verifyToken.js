import axios from "axios";
import qs from "qs";

import getCookieValue from "./getCookieValue";

const verifyToken = async (cookie) => {
    const token = getCookieValue(cookie);

    const request = await axios.post('http://localhost:8080/verifyToken', qs.stringify({token: token}))
    console.log(request.data)

    switch (request.status){
        case 200:
            //if response is fronn session token create an auth token
            if(request.data.jwt)
                document.cookie = `jwt = ${request.data.jwt}; max-age=86400`
            return true
            break;
        default:
            return false
            break;
    }
}

export default verifyToken;