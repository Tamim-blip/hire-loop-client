
import { getApplications } from "@/lib/api/application";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ApplicationsDashboard from "../_component/myapplication";



const MyApplications = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const applications = session?.user?.id
    ? await getApplications(`userId=${session.user.id}`)
    : [];

  return <ApplicationsDashboard applications={applications} />;
};

export default MyApplications;
