import { redirect } from 'next/navigation'; // Import useredirect for redirection
import getSession from '@/lib/actions/server-hooks/getsession.action';

import HomePage from "@/components/pages/Home"

export default async function Home() {

  return (
    <HomePage />
  );
}
