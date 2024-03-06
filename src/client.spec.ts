import nock from 'nock'
import { Client } from './client'

describe('Client', () => {
  it('should be able to login', async () => {
    nock('http://localhost:8080')
      .post('/api/v2/auth/login')
      .query(true)
      .reply(200, '', { 'set-cookie': 'SID=1234' })

    await expect(
      Client.login('http://localhost:8080', 'user', 'pass'),
    ).resolves.toMatchObject(
      expect.objectContaining({
        host: 'http://localhost:8080',
        sessionId: expect.stringMatching('1234'),
      }),
    )
  })

  it('should throw an error when login fails', async () => {
    nock('http://localhost:8080')
      .post('/api/v2/auth/login')
      .query(true)
      .reply(401)

    await expect(
      Client.login('http://localhost:8080', 'user', 'pass'),
    ).rejects.toThrow('Login failed')
  })

  it('should throw an error when no cookies are returned', async () => {
    nock('http://localhost:8080')
      .post('/api/v2/auth/login')
      .query(true)
      .reply(200)

    await expect(
      Client.login('http://localhost:8080', 'user', 'pass'),
    ).rejects.toThrow('Failed to get cookies from response')
  })

  it('should throw an error when no sessionId is returned', async () => {
    nock('http://localhost:8080')
      .post('/api/v2/auth/login')
      .query(true)
      .reply(200, '', { 'set-cookie': 'SID=' })

    await expect(
      Client.login('http://localhost:8080', 'user', 'pass'),
    ).rejects.toThrow('Failed to get sessionId from response')
  })
})
