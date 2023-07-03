import { UploadOption, UploadResult } from './upload-options'
declare class Upload {
	constructor(option: UploadOption | null);
	public async upload(categoryId:string,file:any): Promise<UploadResult<T>>;
}
export { Upload, UploadOption, UploadResult }
