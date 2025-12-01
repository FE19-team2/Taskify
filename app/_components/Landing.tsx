import Main from './Main';
import Header from './Header';
import Footer from './Footer';

export default function Landing() {
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
