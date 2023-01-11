export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public fullName: string,
    public email: string,
    public picture: string,
    public sub: string,
    public subscribedToUsers: string[],
    public subscribers: string[],
    public videoHistory: string[],
    public likedVideos: string[],
    public dislikedVideos: string[]
  ) {}
}
