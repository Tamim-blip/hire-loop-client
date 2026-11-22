'use client'

import { postApplication } from '@/lib/action/jobs';
import { getApplicationsCount } from '@/lib/api/application';
import { useSession } from '@/lib/auth-client';
import { ApiJob } from '@/lib/job';
import { ArrowUpRight, Bookmark, BriefcaseBusiness, CheckCircle2 } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';


const JobHeader = ({data} : {data : ApiJob}) => {

    const router = useRouter()
    const {data : session} = useSession()
    const user = session?.user

   


    const HandleApply =  async() => {

        if(!session?.user){
            router.push(`/sign-in?redirectTo=/browse-jobs/${data._id}`)
            return
        }else if(user?.role === "seeker"){


           const applicationcount = await getApplicationsCount(`userId=${user.id}`)


           if(applicationcount.count > 10){
            redirect('/payment')

           }

            const application = {
                jobId : data._id,
                userId : user?.id,
                email : user?.email,
                name : user?.name,
                jobTitle  : data.title,
                jobType : data.jobType,
                deadline : data.deadline,
                companiName : data.company,
                isRemote : data.isRemote

            }


            const result = await postApplication(application)

            if(result.acknowledged){
              redirect('/browse-jobs')
            }
        }else(console.log("only seeker can aply"))




    }
    return (
          <section className="flex flex-col gap-6 rounded-xl border border-white/[0.08] bg-[#151518] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#202024]">
              <BriefcaseBusiness className="size-7 text-zinc-300" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {data.title}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span>{data.company}</span>

                <span className="text-zinc-600">•</span>

                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="size-4" />
                  Verified Employer
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-[#222226] text-zinc-300 transition hover:bg-white/10"
            >
              <Bookmark className="size-4" />
            </button>

            <button
            onClick={HandleApply}
              type="button"
              className="cursor-pointer flex h-10 items-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Apply Now
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </section>
    );
};

export default JobHeader;