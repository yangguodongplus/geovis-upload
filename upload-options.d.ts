declare class UploadOption{
    constructor(host:string|null,appKey:string|null,secretKey:string|null);
    public host:string;
    public appKey:string;
    public secretKey:string;
}
declare class UploadResult<T>{
    public Success:boolean;
    public Message:string;
    public Data?:T;
}
export {UploadOption,UploadResult}