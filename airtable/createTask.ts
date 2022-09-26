import * as MainFunction from "../utils/main";
import { Callback, Context, Handler } from "aws-lambda";



let response = new MainFunction.AWSType.Response()
export const handler: Handler = async (event:any, context:Context, callback:Callback) => {

//For AWS Cloud Watch monitoring
console.log(event)
try{

    MainFunction.Authorizer.AuthFunc(event, response)
    if(!event.body.accesses[0]) {
        throw new Error("Error in Event body")
    }

    if(!event.body.employeeName) {
        throw new Error("Error in Event body")
    }

    if(!event.body.startDate) {
        throw new Error("Error in Event body")
    }


    if(!event.body.startDate) {
        throw new Error("Error in Event body")
    }

    if(!event.body.position) {
        throw new Error("Error in Event body")
    }

    if(!event.body.dept) {
        throw new Error("Error in Event body")
    }

    if(!event.body.accessID) {
        throw new Error("Error in Event body")
    }

    if(!event.body.employeeID) {
        throw new Error("Error in Event body")
    }

    const dueDate = new Date(event.body.startDate)
    const startDate = new Date(event.body.startDate).toLocaleDateString('sv-SE')
    dueDate.setDate(dueDate.getDate() - 1)
    const dueDateString = dueDate.toLocaleDateString('sv-SE')
    
    const projectName = "Onboarding " + event.body.employeeName + " - Systems Access"
    const projectRecord:MainFunction.AirtableParams.ProjectField = {
        "fields":{
            "Name": projectName,
            "Status": "Execution",
            "Due date": dueDateString,
            "Description": "Name: " + event.body.employeeName + "\n"
            + "Department: " + event.body.dept + "\n"
            + "Position: " + event.body.position,
            EmployeeID: event.body.employeeID
        }}

    //console.log(JSON.stringify(projectRecord))
    const responseAPI = await MainFunction.Airtable.addProject(projectRecord)
    const projectID = responseAPI.data.id
    const subtasksRecord = new MainFunction.AirtableParams.subtaskBody()
    let i = 0
    event.body.accesses.forEach((access: string) => {
        subtasksRecord.records.push({
            "fields": {
            "Task": "Give " + access + " access.",
            "Status": "To Do",
            "👀 Projects": [projectID],
            "Assigned to": {
                "id": "usrAlRcJ9syuZdOTV",
                "email": "angie@helloseven.co",
                "name": "Angie Hollanes"
              },
              "Due date": dueDateString,
              "Access ID": event.body.accessID[i],
              "Start date": startDate
            },  
        });
        i++
    });
    console.log(JSON.stringify(subtasksRecord))

    const responseTAS = await MainFunction.Airtable.addSubtasks(subtasksRecord.records)
    console.log(responseAPI)
    response.statusCode = 200
    response.body = JSON.stringify({
    })
    callback(null, response)
    return response
}catch(err: unknown) 
    {
        console.log(err)
        await MainFunction.ErrorHandler.handleError(err, event.body.employeeID, 'createTask', response, callback, 'Employee ID')
       callback(null, response)
       return response
    
    }
}    
