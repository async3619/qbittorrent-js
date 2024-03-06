import { TorrentState } from '../enums'
import { Client } from '../client'

export interface RawTorrent {
  dlspeed: number
  eta: number
  f_l_piece_prio: boolean
  force_start: boolean
  hash: string
  category: string
  tags: string
  name: string
  num_complete: number
  num_incomplete: number
  num_leechs: number
  num_seeds: number
  priority: number
  progress: number
  ratio: number
  seq_dl: boolean
  size: number
  state: TorrentState
  super_seeding: boolean
  upspeed: number
}

export class Torrent implements RawTorrent {
  public readonly dlspeed!: number
  public readonly eta!: number
  public readonly f_l_piece_prio!: boolean
  public readonly force_start!: boolean
  public readonly hash!: string
  public readonly category!: string
  public readonly tags!: string
  public readonly name!: string
  public readonly num_complete!: number
  public readonly num_incomplete!: number
  public readonly num_leechs!: number
  public readonly num_seeds!: number
  public readonly priority!: number
  public readonly progress!: number
  public readonly ratio!: number
  public readonly seq_dl!: boolean
  public readonly size!: number
  public readonly state!: TorrentState
  public readonly super_seeding!: boolean
  public readonly upspeed!: number

  private readonly client: Client

  public constructor(client: Client, data: RawTorrent) {
    Object.assign(this, data)
    this.client = client
  }
}
