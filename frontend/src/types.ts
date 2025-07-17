import type { AxiosRequestConfig } from "axios";

export interface ConfigWithJWT extends AxiosRequestConfig{
    headers : {
        "Content-type" : string;
         Authorization : string;
    }
}