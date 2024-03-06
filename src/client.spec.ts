import nock from 'nock'
import { Client } from './client'

describe('Client', () => {
  it('should be able to login', async () => {
    nock('http://localhost:8080')
      .post('/api/v2/auth/login', { username: 'user', password: 'pass' })
      .reply(200, '', { SID: '123' })

    await expect(
      Client.login('http://localhost:8080', 'user', 'pass'),
    ).resolves.not.toThrow()
  })

  it('should throw an error when login fails', async () => {
    nock('http://localhost:8080')
      .post('/api/v2/auth/login', { username: 'user', password: 'pass' })
      .reply(401)

    await expect(
      Client.login('http://localhost:8080', 'user', 'pass'),
    ).rejects.toThrow('Login failed')
  })
})
