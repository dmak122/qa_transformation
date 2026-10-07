export class Student {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: 'Male' | 'Female' | 'Other',
    public mobile: string,
    public subject: string,
    public hobby: 'Sports' | 'Reading' | 'Music',
    public address: string,
    public state: string,
    public city: string
  ) {}
}