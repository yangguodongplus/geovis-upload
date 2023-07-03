class UploadOption{
    constructor(host,appKey,secretKey,expireTime){
        this.host =host;
        this.appKey =appKey;
        this.secretKey =secretKey;
        this.expireTime =expireTime;
    }
}
class UploadResult{
    constructor(){
        this.Success=false;
        this.Message="";
        this.Data=null;
    }
}
module.exports = {
    UploadOption,
    UploadResult
  };
// export {UploadOption,UploadResult}