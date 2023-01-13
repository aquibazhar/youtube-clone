import { Comment } from './comment';
import { User } from './user';

export class CommentAuthor {
  constructor(public comment: Comment, public author: User) {}
}
