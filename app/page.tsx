import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Landing from './_components/Landing';

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (accessToken) {
    redirect('/dashboard');
  }

  return <Landing />;
}
