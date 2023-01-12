export class Comment {
  constructor(
    public text: string,
    public authorId: string,
    public likes: number,
    public dislikes: number,
    public publishedAt: string
  ) {}
}
