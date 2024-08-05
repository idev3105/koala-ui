import NextAuth, { CredentialsSignin, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import 'next-auth/jwt'
import * as AuthService from '@/services/auth.service'

declare module 'next-auth' {
  interface Session {
    idToken: string
    accessToken: string
    refreshToken: string
  }

  interface User {
    idToken: string
    accessToken: string
    refreshToken: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // TODO: Implement your authentication logic here

        if (credentials.email != 'test@mail.com' && credentials.password != 'test') {
          throw new CredentialsSignin('Invalid credentials')
        }

        const response = await AuthService.signIn(
          credentials.email as string,
          credentials.password as string,
        )

        let user = {
          id: 'test-user-id',
          name: 'Test User',
          email: 'test@mail.com',
          idToken: response.idToken,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }

        return user
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session, account }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.idToken = user.idToken
        token.refreshToken = user.refreshToken
      }
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.idToken = token.idToken as string
      session.refreshToken = token.refreshToken as string
      session.user.id = token.id as string
      return session
    },
  },
})
