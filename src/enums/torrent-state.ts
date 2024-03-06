export enum TorrentState {
  // Some error occurred, applies to paused torrents
  Error = 'error',

  // Torrent data files is missing
  MissingFiles = 'missingFiles',
  // Torrent is being seeded and data is being transferred
  Uploading = 'uploading',
  // Torrent is paused and has finished downloading
  PausedUpload = 'pausedUP',
  // Queuing is enabled and torrent is queued for upload
  QueuedUpload = 'queuedUP',
  // Torrent is being seeded, but no connection were made
  StalledUpload = 'stalledUP',
  // Torrent has finished downloading and is being checked
  CheckingUpload = 'checkingUP',
  // Torrent is forced to uploading and ignore queue limit
  ForcedUpload = 'forcedUP',
  // Torrent is allocating disk space for download
  Allocating = 'allocating',
  // Torrent is being downloaded and data is being transferred
  Downloading = 'downloading',
  // Torrent has just started downloading and is fetching metadata
  MetaDownload = 'metaDL',
  // Torrent is paused and has NOT finished downloading
  PausedDownload = 'pausedDL',
  // Queuing is enabled and torrent is queued for download
  QueuedDownload = 'queuedDL',
  // Torrent is being downloaded, but no connection were made
  StalledDownload = 'stalledDL',
  // Same as CheckingUpload, but torrent has NOT finished downloading
  CheckingDownload = 'checkingDL',
  // Torrent is forced to downloading to ignore queue limit
  ForcedDownload = 'forcedDL',
  // Checking resume data on qBt startup
  CheckingResumeData = 'checkingResumeData',
  // Torrent is moving to another location
  Moving = 'moving',
  // Unknown status
  Unknown = 'unknown',
}
