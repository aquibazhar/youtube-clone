import { User } from './user';
import { Video } from './video';

export class VideoAuthor {
  constructor(public video: Video, public author: User) {}
}
