const { UploadOption, UploadResult } = require('geovis-upload/upload-options');
// const http = require('http');
const crypto = require('crypto');
const axios = require('axios');

class Upload {
    constructor(option) {
        if (option) {
            this.option = option;
        }
        else {
            let UploadHost = "https://cloud.geovisearth.com";
            let AppKey = "";
            let SecretKey = "";
            let expireTime = 86400;
            this.option = new UploadOption(UploadHost, AppKey, SecretKey, expireTime);
        }
    }
    hmacSHA256(message, key) {
        const messageBytes = Buffer.from(message, 'utf8');
        const hmacKey = Buffer.from(key, 'base64');
        const hmac = crypto.createHmac('sha256', hmacKey);
        hmac.update(messageBytes);
        const signature = hmac.digest('base64');
        return signature;
      }
 computeBufferHash(buffer) {
        const hash = crypto.createHash('md5');
        hash.update(buffer);
        return hash.digest('hex');
      }
    async upload(categoryId, file) {
        let data = file.buffer;
        const hash=this.computeBufferHash(file.buffer);
        let param = `appKey=${this.option.appKey}&categoryId=${categoryId}&filename=${file.originalname}&hash=${hash}`;
        const sign = this.hmacSHA256(param,this.option.secretKey);
        let url=`${this.option.host}api/filecore/upload?${param}&sign=${sign}`;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'application/octet-stream', 
            },
            data: data
        };
        return new Promise((resolve, reject) => {
        axios.request(config)
            .then((response) => {
                resolve(response.data);
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }
}
module.exports = { Upload, UploadOption, UploadResult };