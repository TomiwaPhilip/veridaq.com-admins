import { redirect } from 'next/navigation'; // Import useredirect for redirection
import getSession from '@/lib/actions/server-hooks/getsession.action';

import HomePage from "@/components/pages/Home"

export default async function Home() {

    const session = await getSession();

    const onboarded = session.isOnboarded;
    console.log(onboarded)

    // if (!onboarded) {
    //   redirect('/auth/onboarding'); // Use redirect for redirection
    // } 

  return (
    <HomePage />
  );
}
