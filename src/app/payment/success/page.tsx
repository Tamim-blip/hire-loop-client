import { paymentVerify, recruiterPaymentVerify } from '@/lib/action/payment'
import { getSession } from '@/lib/core/server'
import { stripe } from '@/lib/stripe'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { use } from 'react'




export default async function Success({ searchParams } : {searchParams : Promise<{session_id? : string}>}) {
  const { session_id } = await searchParams

  const session = await getSession()
  const user = session?.user

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_email,
    amount_total,
    metadata,
    payment_status,
    payment_intent,

     
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  
  const amount = (amount_total ?? 0) / 100;

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete' && payment_status === "paid") {

    console.log(status,
    customer_email,
    amount,
    metadata,
    payment_status,
    payment_intent,
)


if(user?.role === "seeker"){
  const result = await paymentVerify(session_id)
  console.log ( "backend ",result)
  
}else if(user?.role === "recruiter"){
  const result = await recruiterPaymentVerify(session_id)
  console.log ( "backend ",result)
}

   

 const transactionId =
    typeof payment_intent === "object" && payment_intent
      ? payment_intent.id
      : payment_intent ?? "N/A";


    return (
     <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
  <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
    {/* Success Header */}
    <div className="flex flex-col items-center px-6 pt-10 pb-8 text-center">
      <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-emerald-500/10">
        <CheckCircle2 className="size-12 text-emerald-500" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Payment Successful!
      </h1>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        Thank you for your purchase. Your payment has been
        successfully processed.
      </p>
    </div>

    {/* Payment Details */}
    <div className="mx-6 rounded-xl border border-border bg-muted/40 p-5">
      <p className="text-center text-sm text-muted-foreground">
        Amount paid
      </p>

      <p className="mt-2 text-center text-3xl font-bold tracking-tight">
        ${amount.toFixed(2)}
      </p>

      <div className="mt-5 flex items-start gap-3 border-t border-border pt-4">
        <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

        <div className="min-w-0">
          <p className="text-sm font-medium">
            Confirmation email
          </p>

          <p className="mt-1 break-all text-sm text-muted-foreground">
            {customer_email}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium">
            Transaction ID
          </p>

          <p className="mt-1 break-all text-sm text-muted-foreground">
            {transactionId}
          </p>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="px-6 pt-6 pb-8">
      <Link
        href={
          user?.role === "recruiter"
            ? "/dashboard/recruiter/add-job"
            : "/browse-jobs"
        }
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#5c53fe] text-sm font-semibold text-white transition hover:bg-[#6f67ff]"
      >
        Go to Dashboard
        <ArrowRight className="size-4" />
      </Link>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Thank you for choosing HireLoop.
      </p>
    </div>
  </div>
</section>
    )
  }
}