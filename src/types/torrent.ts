import { TorrentState } from '../enums'

export interface Torrent {
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
