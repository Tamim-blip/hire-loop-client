"use server"

import type { JobFormData } from "@/lib/job"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default async function postJob(data: JobFormData) {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error("Failed to publish job")
    }

    return res.json()
}


 export const deleteJob = async (_id : string) => {

    const res = await fetch(`${BASE_URL}/jobs/${_id}`,{
        method : "DELETE"
    })

    if (!res.ok) {
        throw new Error("Failed to delete job")
    }

    return res.json()

 }



 export async function updateJob (data : JobFormData, id : string) {

     const res = await fetch(`${BASE_URL}/jobs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error("Failed to publish job")
    }

    return res.json()



 }



 export async function postApplication (data) {

    const res = await fetch(`${BASE_URL}/applications`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })

    return res.json()
 }