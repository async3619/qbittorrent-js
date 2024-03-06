export class Client {
  public static async login(host: string, username: string, password: string) {
    const response = await fetch(`${host}/api/v2/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const sessionId = response.headers.get('SID')
    if (!sessionId) {
      throw new Error('Login failed')
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
