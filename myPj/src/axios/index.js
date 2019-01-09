import axios from 'axios';
import qs from 'qs';
import APIurl from './api.url';

axios.defaults.timeout=5000;
axios.defaults.baseURL=APIurl.baseURL;
axios.defaults.responseType='json';
axios.defaults.headers.common['Content-Type']='application/json;charset=UTF-8';
axios.defaults.withCredentials=true;

axios.interceptors.request.use(
    config=>{
        if(token){
            config.headers.Authorization = `token ${token}`;
        }
        return config
    },
    err=>{
        return Promise.reject(err);
    }
)   
axios.interceptors.response.use(
    response=>{
        switch (response.data.error) {
            case 401:
            response.data.msg = '未授权，请登录';
            break;
            default:
            break;
        }   
        return response;
    },
    error=>{
        console.log(error);
        return Promise.reject(error);
    }
)

export default axios;

export function post(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.post(url,qs.stringify(data)).then(res=>{
          resolve(res.data);   
        },err=>{
           reject(err)
        })
    })
}

export function get(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.get(url,{params:data}).then(res=>{
            resolve(res.data)
        },err=>{
            reject(err);
        })
    })
}