export class Time {
  constructor(
    public startTime: moment.Moment | string,
    public endTime: moment.Moment | string,
    public duration: number
  ) {}
}
