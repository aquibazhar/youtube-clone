export class Comment {
  constructor(
    public id: string,
    public text: string,
    public authorId: string,
    public likes: number,
    public dislikes: number,
    public likeFlag: boolean,
    public dislikeFlag: boolean,
    public publishedAt: string,
    public videoId: string
  ) {}
}
