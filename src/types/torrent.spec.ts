import { Client } from '../client'
import { RawTorrent, Torrent } from './torrent'

describe('Torrent', () => {
  describe('constructor()', () => {
    it('should create a new instance', () => {
      const client = {} as Client
      const data = { hash: 'HASH' } as RawTorrent
      const torrent = new Torrent(client, data)

      expect(torrent).toBeInstanceOf(Torrent)
      expect(torrent).toMatchObject(data)
    })
  })

  describe('getGenericProperties()', () => {
    it('should call client.getTorrentGenericProperties()', () => {
      const client = {
        getTorrentGenericProperties: jest.fn(),
      } as unknown as Client
      const data = { hash: 'HASH' } as RawTorrent
      const torrent = new Torrent(client, data)

      torrent.getGenericProperties()

      expect(client.getTorrentGenericProperties).toHaveBeenCalledWith('HASH')
    })
  })
})
