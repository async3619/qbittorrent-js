import setCookie from 'set-cookie-parser'
import fetch from 'node-fetch'

export class Client {
  public static async login(host: string, username: string, password: string) {
    const response = await fetch(`${host}/api/v2/auth/login`, {
      method: 'POST',
      body: new URLSearchParams({ username, password }),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const cookies = response.headers.get('set-cookie')
    if (!cookies) {
      throw new Error('Failed to get cookies from response')
    }

    const sessionId = setCookie
      .parse(cookies)
      .find((cookie) => cookie.name === 'SID')?.value

    if (!sessionId) {
      throw new Error('Failed to get sessionId from response')
    }

    return new Client(host, sessionId)
  }

  private readonly host: string
  private readonly sessionId: string

  private constructor(host: string, sessionId: string) {
    this.host = host
    this.sessionId = sessionId
  }
}
