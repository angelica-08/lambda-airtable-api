import { Callback } from "aws-lambda";
import { AxiosError } from "axios";
import { Response } from "../types/aws-response";
import { sendSlackMessage } from "./slack";


export async function handleError(err:unknown, contactID:string|undefined, apiName:string, response:Response, callback:Callback, id_type:string){
   
  let errormessage = id_type + ': ' + contactID + '\n' + 'API: '+ apiName + '\n'

   if (err instanceof Error) {
      errormessage = errormessage + 'Error : ' + err.message
      response.body = errormessage
      await sendSlackMessage(errormessage)
   }
   else if(err instanceof AxiosError) {

      if(err.response?.status){

         response.statusCode = err.response.status
      
         if (err.response?.status == 429) {

            errormessage = errormessage + 'Error : Status 429 from Ontraport: Too Many Requests. Please check if API is rerun and succeeded.'
            console.log(errormessage)
            await sendSlackMessage(errormessage)
            callback(null, response)
            throw err

         }else if(err.response?.status == 401){

            console.log(errormessage)
            await sendSlackMessage(errormessage)
            callback(null, response)
            throw err

         }else {

            errormessage  = errormessage + 'Status: ' + err.response?.status + ' from Ontraport ' + err.message
            await sendSlackMessage(errormessage)

         }
      }

      response.body = errormessage
   }

   if(response.statusCode === 200){
      response.statusCode = 500
   }

   console.log('Unexpected error', err);
   return response
}