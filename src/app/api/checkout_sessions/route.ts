
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/core/server";

export async function POST() {
  try {
    const userSession = await getSession();
    const user = userSession?.user;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    if (!origin) {
      return NextResponse.json(
        { error: "Origin not found" },
        { status: 400 }
      );
    }

    let priceId: string;
    let metadata: Record<string, string>;

    if (user.role === "seeker") {
      priceId = "price_1UeaEpLKhJIhFrP8ZVcvrrVU";

      metadata = {
        userId: user.id,
      };
    } else if (user.role === "recruiter") {
      priceId = "price_1Ueu6aLKhJIhFrP8tQ3ANkqB";

      metadata = {
        recruiterId: user.id,
      };
    } else {
      return NextResponse.json(
        { error: "Invalid user role" },
        { status: 403 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata,
      customer_email: user.email,
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment`,
      integration_identifier: "Hire_Loop_web_001",
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    const error =
      err instanceof Error
        ? err
        : new Error(String(err));

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
