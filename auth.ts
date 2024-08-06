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

        // TODO: This is only fake user
        let user = {
          id: 'test-user-id',
          name: 'Test User',
          email: 'test@mail.com',
          image: 'http://exaple.com/demo.jpg',
          idToken: response.idToken,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }

        return user
      },
    }),
  ],
  callbacks: {
    // this callback will generate JWT token from what you return
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        // if type is credentials, get token from user which is returned from authorize()
        // else get them from account which is parsed from OAuth2 callback
        if (account.type == 'credentials') {
          token.accessToken = user.accessToken
          token.idToken = user.idToken
          token.refreshToken = user.refreshToken
        } else {
          token.accessToken = account.access_token
          token.idToken = account.id_token
          token.refreshToken = account.refresh_token
        }
      }
      return token
    },
    // this callback will get claim from JWT token
    // you can choose what information need save into session
    session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.idToken = token.idToken as string
      session.refreshToken = token.refreshToken as string
      session.user.id = token.id as string
      return session
    },
  },
})
