import Main from './Main';
import Header from './Header';
import Footer from './Footer';

export default function Landing() {
  return (
    <div className=" max-w-[1920px] min-h-screen overflow-hidden">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
