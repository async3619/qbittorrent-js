import nock from 'nock'
import { Client } from './client'
import { TorrentFilter } from './enums'
import { Torrent } from './types/torrent'

describe('Client', () => {
  describe('login()', () => {
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

  describe('getTorrentList()', () => {
    let client: Client

    beforeEach(async () => {
      nock('http://localhost:8080')
        .post('/api/v2/auth/login')
        .query(true)
        .reply(200, '', { 'set-cookie': 'SID=1234' })

      client = await Client.login('http://localhost:8080', 'user', 'pass')
    })

    it('should be able to fetch torrent lists', async () => {
      nock('http://localhost:8080')
        .get('/api/v2/torrents/info')
        .query(true)
        .reply(200, [{ name: 'torrent1' }, { name: 'torrent2' }])

      const torrents = await client.getTorrentList()
      for (const torrent of torrents) {
        expect(torrent).toBeInstanceOf(Torrent)
      }
    })

    it('should be able to fetch torrent lists with filters', async () => {
      nock('http://localhost:8080')
        .get('/api/v2/torrents/info')
        .query({ filter: TorrentFilter.Active })
        .reply(200, [{ name: 'torrent1' }, { name: 'torrent2' }])

      const torrents = await client.getTorrentList({
        filter: TorrentFilter.Active,
      })
      for (const torrent of torrents) {
        expect(torrent).toBeInstanceOf(Torrent)
      }
    })

    it('should be able to fetch torrent lists with pagination', async () => {
      nock('http://localhost:8080')
        .get('/api/v2/torrents/info')
        .query({ limit: 10, offset: 20 })
        .reply(200, [{ name: 'torrent1' }, { name: 'torrent2' }])

      const torrents = await client.getTorrentList({ limit: 10, offset: 20 })
      for (const torrent of torrents) {
        expect(torrent).toBeInstanceOf(Torrent)
      }
    })

    it('should throw an error when fetching torrent lists fails', () => {
      nock('http://localhost:8080')
        .get('/api/v2/torrents/info')
        .query(true)
        .reply(500)

      return expect(client.getTorrentList()).rejects.toThrow(
        'Request failed: 500 Internal Server Error',
      )
    })
  })
})
