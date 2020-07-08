const { response } = require("express");

const paystack=function(request){
    const secretkey='sk_test_adf1b701bf31970a670478a66ca0b2902eb2cfd0';

    const initializepayment=function(form, cb){
        const options={
            url : 'https://api.paystack.co/transaction/initialize',
            headers : {
                authorization : secretkey,
                'content-type' : 'application/json',
                'cache-control' : 'no-cache'
            },
            form
        }
        const callback=(error,response,body)=>{
            return cb(error,body);
        }
        request.post(options,callback);
    };
    const verifypayment=function(ref,cb){
        
    };
    return {initializepayment,verifypayment};
}