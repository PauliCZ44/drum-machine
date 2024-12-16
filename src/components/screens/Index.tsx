import { Head } from '~/components/shared/Head';
import Footer from '../shared/Footer';

function Index() {

  return (
    <>
      <Head title="Drums and beats" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content w-full flex-wrap">
          <h1 className="w-full pb-10">Select your drums</h1>
          <div className="flex w-full max-w-160 flex-wrap gap-y-10">
            <a href="/drums" className="btn btn-primary btn-lg mx-auto w-52">
              DRUMS (Manual)
            </a>
            <a href="/beats" className="btn btn-accent btn-lg mx-auto w-52">
              BEATS (Auto)
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Index;
