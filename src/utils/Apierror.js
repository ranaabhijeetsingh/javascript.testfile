class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        statck = "",

    ){
    
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = false;
        this.errors = errors

        if(statck){
            this.stack = statck
        }else{
            Error.captureStackTrace(this,this.contructor)
        }
    } 
} 
exports(ApiError)