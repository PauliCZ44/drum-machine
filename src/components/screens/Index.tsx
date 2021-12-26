import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';

function Index() {
  const { state } = useAuthState();

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content w-full flex-wrap">
          <h1 className="w-full pb-10">Select your drums</h1>
          <div className="flex w-full max-w-160">
            <a href="/drums" className="btn btn-primary btn-lg mx-auto w-52">
              DRUMS (Manual)
            </a>
            <a href="/beats" className="btn btn-accent btn-lg mx-auto w-52">
              BEATS (Auto)
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
