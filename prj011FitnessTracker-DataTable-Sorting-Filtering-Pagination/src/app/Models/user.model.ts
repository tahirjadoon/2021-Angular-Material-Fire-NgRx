export class UserModel {
    constructor(
      public email: string,
      public userId: string
    ) { }
}

/*
we can assign in the same step as well:
public email: string = '',
public userId: string = ''
*/