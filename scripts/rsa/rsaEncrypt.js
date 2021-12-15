import NodeRSA from 'node-rsa';

const rsaEncrypt = (data) => {
    const key = new NodeRSA();

    const rsaPublicKey = '-----BEGIN PUBLIC KEY-----\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlEyO4Wif5/3gfRb5t1Zv\n' +
        '23Oo1OJpqcOgPWJgD3hP9YSpidsX5CMWWnzCMnDlf72Ogi3Lu+sxniF2YUC/BrnY\n' +
        'mmdSEP5/M4l9by7xWIfLFeYfE2kpDtolKW1VUCUEkOqiMBBDS4iMaw2GDMs/EV5F\n' +
        '98FiDirNtTxK/lxe01rX0o2AzfGMDpB2YoiWtkiCLXhWIv6tvVomeSlujPu48kmH\n' +
        'gyhdu9PlmfawVVjBKx74kRK4EK3PnX5Q+58d8eAknGw45BCsfcZxlDA8yKcbfitX\n' +
        'cFUzIB+JgESSl25QUDAbDaqGLbqYB0JJfyTE2CuBxzdDyULrkIKUTyu0WyrE4K3K\n' +
        'TQIDAQAB\n' +
        '-----END PUBLIC KEY-----'

    key.importKey(rsaPublicKey, 'pkcs8-public')

    return key.encrypt(data, 'base64', 'utf-8')
}
export default rsaEncrypt
