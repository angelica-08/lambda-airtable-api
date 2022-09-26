import * as MainFunction from "../utils/main";
import { Callback, Context, Handler } from "aws-lambda";

let response = new MainFunction.AWSType.Response()
export const handler: Handler = async (event:any, context:Context, callback:Callback) => {

//For AWS Cloud Watch monitoring
console.log(event)
try{

    MainFunction.Authorizer.AuthFunc(event, response)

    if(!event.body.employeeID) {
        throw new Error("Error in Event body")
    }


    if(!event.body.accessIDs[0]) {
        throw new Error("Error in Event body")
    }

    const prevGranted = await MainFunction.Airtable.getAccessGranted(event.body.employeeID)
    console.log(prevGranted.data)

    const accessGranted = []
      
    if(prevGranted.data.fields["Access Granted"][0]){
        accessGranted.push(...prevGranted.data.fields["Access Granted"])
    }
    accessGranted.push(...event.body.accessIDs)
    const body = {
                "fields": {
                    "Access Granted": accessGranted,
                    "Status": "Onboarded"
                }
    }

    const responseAPI = await MainFunction.Airtable.updateAccessGranted(body, event.body.employeeID)
 
    console.log(responseAPI.data)
    response.statusCode = 200
    response.body = JSON.stringify({
    })
    callback(null, response)
    return response
    
}catch(err: unknown) 
    {
        console.log(err)
        await MainFunction.ErrorHandler.handleError(err, event.body.employeeID, 'updateAccessGranted', response, callback, 'Employee ID')
       callback(null, response)
       return response
    
    }
}    
