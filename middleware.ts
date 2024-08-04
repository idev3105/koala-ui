import { auth, signIn } from '@/auth'

export default auth(async (req) => {
  // TODO implement your middleware here
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
