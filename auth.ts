import NextAuth, { User } from 'next-auth'
import credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // TODO: Implement your authentication logic here
        if (credentials.email != 'test@mail.com' && credentials.password != 'test') {
          throw new Error('Invalid credentials')
        }

        let user: User = {
          id: 'test-user-id',
          name: 'Test User',
          email: 'test@mail.com',
        }

        return user
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session, account }) {
      console.log('jwt callback user', user)
      console.log('jwt callback account', account)
      console.log('jwt callback token', token)
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    session({ session, token }) {
      console.log('session callback token', token)
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    },
  },
})
