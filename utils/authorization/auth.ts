import { Response } from "../types/aws-response"
const authKey = process.env.AUTH_API_KEY

export function AuthFunc(event:any, response:Response) {
    if(!event.headers){
        response.statusCode = 401
        throw new Error('Unathorized Access. Please Provide Auth Key')
    }
    
    if(event.headers.Authorization !== authKey){
        response.statusCode = 401
        throw new Error('Unathorized Access. Incorrect Auth Key')
    }
}
