import { VideoHistory } from './video-history';

export class CombinedDateTime {
  constructor(public date: string, public dateAndTime: VideoHistory[]) {}
}
