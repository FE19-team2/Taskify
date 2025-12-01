import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Landing from './_components/Landing';

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (accessToken) {
    redirect('/mydashboard');
  }

  return (
    <div className="bg-[#0f1112] w-full flex items-center justify-center min-h-screen overflow-x-hidden">
      <div
        className="
  absolute inset-0 
  bg-linear-to-r 
  from-transparent 
  via-[#00ff66]/4
  to-transparent
  pointer-events-none
"
      />
      <Landing />
    </div>
  );
}
