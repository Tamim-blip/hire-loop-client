import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const BrowseJobs = async({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {


    const SearchParams = await searchParams

    const urlSearch = new URLSearchParams(SearchParams as Record<string, string> )
    const query = urlSearch.toString()

    const browseJobs = await getJobs(query)
    console.log(query)
    return (
        <div>
           {
            browseJobs.map(job => <li key={job._id}>{job.title}</li>)
           }
            
        </div>
    );
};

export default BrowseJobs;