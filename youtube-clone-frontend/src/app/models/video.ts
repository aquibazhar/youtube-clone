export class Video {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public userId: string,
    public likes: number,
    public dislikes: number,
    public tags: string[],
    public videoStatus: string,
    public views: number,
    public thumbnailUrl: string,
    public comments: string[],
    public url: string,
    public date: string
  ) {}
}
