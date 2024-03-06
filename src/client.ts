import setCookie from 'set-cookie-parser'
import fetch, { RequestInit } from 'node-fetch'

import { TorrentFilter } from './enums'

import { RawTorrent, Torrent } from './types/torrent'
import { TorrentGenericProperties } from './types/torrent-generic-properties'

interface GetTorrentListOptions {
  filter?: TorrentFilter
  offset?: number
  limit?: number
}

interface FetchOptions extends RequestInit {
  queries?: Record<string, string | number | undefined>
}

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

  public async getTorrentList({
    filter,
    limit,
    offset,
  }: GetTorrentListOptions = {}): Promise<Torrent[]> {
    return this.fetch(`/api/v2/torrents/info`, {
      queries: { filter, limit, offset },
    })
      .then((response) => response.json())
      .then((items: RawTorrent[]) =>
        items.map((torrent) => new Torrent(this, torrent)),
      )
  }

  public async getTorrentGenericProperties(hash: string) {
    return this.fetch(`/api/v2/torrents/properties`, {
      queries: { hash },
    })
      .then((response) => response.json())
      .then((properties) => new TorrentGenericProperties(properties))
  }

  private async fetch(path: string, init?: FetchOptions) {
    const queries = init?.queries ?? {}
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(queries)) {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    }

    let url = `${this.host}${path}`
    if (searchParams.size) {
      url += `?${searchParams}`
    }

    const response = await fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        cookie: `SID=${this.sessionId}`,
      },
    })

    if (!response.ok) {
      const message =
        (await response.text()) || `${response.status} ${response.statusText}`
      throw new Error(`Request failed: ${message}`)
    }

    return response
  }
}
