import axios from 'axios'
import * as AirtableParams from '../params/airtable-params'
const Options = AirtableParams.airtableOptions

export async function addSubtasks(subTaskFields: AirtableParams.SubTaskField[]){
    const url = process.env.TASKTABLE || ''
    const body =  {records :subTaskFields}
    const response = await axios.post(url, body, Options)
    return response
}

export async function addProject(projectFields: AirtableParams.ProjectField){
    console.log(JSON.stringify(projectFields))
    const url = process.env.PROJECT_TABLE || ''
    const body =  projectFields
    const response = await axios.post(url, body, Options)
    return response
}

export async function updateAccessGranted(record:any, ID:string){
   let records : String[] | Object

    if(record.length > 1) {
        records = {records : record}
    }else {
        records = record
    }

    const url = process.env.EMPLOYEE_TABLE + ID
    const response = await axios.patch(url, records, Options)
    return response
}

export async function getAccessGranted(ID:string){
    const url = process.env.EMPLOYEE_TABLE + ID
    const response = await axios.get(url,Options)
    return response
}