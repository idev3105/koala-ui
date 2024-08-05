export type SignInResponse = {
  idToken: string
  accessToken: string
  refreshToken: string
}

export async function signIn(email: string, password: string): Promise<SignInResponse> {
  // TODO: Implement your authentication logic here
  return {
    idToken: 'idToken',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  }
}

export async function signOut() {}
