import { JobFormData } from "@/app/dashboard/recruiter/add-job/page"



const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default async function postJob (data : JobFormData ){

    const res = await fetch(`${BASE_URL}/jobs`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })

    return res.json()

}