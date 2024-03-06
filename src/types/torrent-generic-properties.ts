export interface RawTorrentGenericProperties {
  addition_date: number
  comment: string
  completion_date: number
  created_by: string
  creation_date: number
  dl_limit: number
  dl_speed: number
  dl_speed_avg: number
  eta: number
  last_seen: number
  nb_connections: number
  nb_connections_limit: number
  peers: number
  peers_total: number
  piece_size: number
  pieces_have: number
  pieces_num: number
  reannounce: number
  save_path: string
  seeding_time: number
  seeds: number
  seeds_total: number
  share_ratio: number
  time_elapsed: number
  total_downloaded: number
  total_downloaded_session: number
  total_size: number
  total_uploaded: number
  total_uploaded_session: number
  total_wasted: number
  up_limit: number
  up_speed: number
  up_speed_avg: number
}

export class TorrentGenericProperties implements RawTorrentGenericProperties {
  public readonly addition_date!: number
  public readonly comment!: string
  public readonly completion_date!: number
  public readonly created_by!: string
  public readonly creation_date!: number
  public readonly dl_limit!: number
  public readonly dl_speed!: number
  public readonly dl_speed_avg!: number
  public readonly eta!: number
  public readonly last_seen!: number
  public readonly nb_connections!: number
  public readonly nb_connections_limit!: number
  public readonly peers!: number
  public readonly peers_total!: number
  public readonly piece_size!: number
  public readonly pieces_have!: number
  public readonly pieces_num!: number
  public readonly reannounce!: number
  public readonly save_path!: string
  public readonly seeding_time!: number
  public readonly seeds!: number
  public readonly seeds_total!: number
  public readonly share_ratio!: number
  public readonly time_elapsed!: number
  public readonly total_downloaded!: number
  public readonly total_downloaded_session!: number
  public readonly total_size!: number
  public readonly total_uploaded!: number
  public readonly total_uploaded_session!: number
  public readonly total_wasted!: number
  public readonly up_limit!: number
  public readonly up_speed!: number
  public readonly up_speed_avg!: number

  public constructor(data: RawTorrentGenericProperties) {
    Object.assign(this, data)
  }
}
