
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getApplications (query = "") {

    const res = await fetch(`${BASE_URL}/applications?${query}`)

    return res.json()

}



export async function getApplicationsCount (query = "") {

    const res = await fetch(`${BASE_URL}/applications/count?${query}`)

    return res.json()

}