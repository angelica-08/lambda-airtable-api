export class Response {
    statusCode: number;
    headers: {
        contentType: "application/json"
    };
    body: string;
    isBase64Encoded: boolean


    constructor() {
        this.statusCode = 500
        this.headers =  {
            contentType: "application/json"
        }
        this.body = JSON.stringify({success:true})
        this.isBase64Encoded = false
      }
};
