import { Response } from 'express';

interface ResponseData{
    [key : string] : unknown,

}
export const sendResponse = (res : Response,status:number,success :boolean,message:string,data:ResponseData={})=>{
    res.status(status).send({
        success,
        message,
        ...data
    });
}