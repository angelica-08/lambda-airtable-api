export const airtableOptions = {
    headers: { 
        Authorization: "Bearer " + process.env.AIRTABLE,
        "Content-Type": "application/json"
    }
}

export const airtableGetOptions = {
    headers: { 
        Authorization: "Bearer " + process.env.AIRTABLE,
    }
}

export class subtaskBody {

            records:SubTaskField[]

            constructor() {
                this.records = []
            }   
          
}

export type SubTaskField ={
        fields: {
        Task: string,
        Status : "To Do",
        "Assigned to": {
          "id": "usrAlRcJ9syuZdOTV",
          "email": "angie@helloseven.co",
          "name": "Angie Hollanes"
        },
       "Due date": string
        "👀 Projects": string[],
        "Access ID" : string,
        "Start date": string
    }
}

export type ProjectField = {
    fields: {
        Name: string,
        Status : "Execution",
        "Due date": string, 
        Description: string,
        EmployeeID: string
    }
}
