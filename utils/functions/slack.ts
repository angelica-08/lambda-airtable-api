import axios, { AxiosRequestConfig } from "axios"


const slack2URL = process.env.SLACK_URL || ''

export async function sendSlackMessage(message:string)
{
    const slackText = {text: message}
    await axios.post(slack2URL, slackText, jsonDataOptions)
    return
}

export const jsonDataOptions : AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json"
    }
}
