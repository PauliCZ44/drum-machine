import { useAuthState } from '~/components/contexts/UserContext'
import { SignInButton } from '~/components/domain/auth/SignInButton'
import { SignOutButton } from '~/components/domain/auth/SignOutButton'
import { Head } from '~/components/shared/Head'

function Index() {
  const { state } = useAuthState()

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content">
          <div>
            <div className="mt-4">
              {state.state === 'UNKNOWN' ? null : state.state === 'SIGNED_OUT' ? <SignInButton /> : <SignOutButton />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
