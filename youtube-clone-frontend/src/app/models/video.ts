export class Video {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public userId: String,
    public likes: number,
    public dislikes: number,
    public tags: String[],
    public videoStatus: String,
    public views: number,
    public thumbnailId: String,
    public comments: String[],
    public url: String
  ) {}
}
