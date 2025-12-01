import Main from './_components/Main';
import Header from './_components/Header';
import Footer from './_components/Footer';

export default function Page() {
  return (
    <div className="bg-[#0f1112]">
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
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
