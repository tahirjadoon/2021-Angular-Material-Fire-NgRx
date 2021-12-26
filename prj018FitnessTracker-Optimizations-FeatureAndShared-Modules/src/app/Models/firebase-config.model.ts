export class FireBaseConfigModel{
    constructor(
      public logins: FireBaseLoginsModel[],
      public firebase: FireBaseDataModel,
      public projectInfo: ProjectInfoModel
    ){}
  }

export class FireBaseDataModel{
    constructor(
    public backEndUrl: string = "", 
    public backEndApiKey: string = "",
    public backEndAuthDomain: string = ""
    ){}
}

export class FireBaseLoginsModel{
    constructor(
    public userId: string, 
    public password: string, 
    public type: string
    ){}
}

export class ProjectInfoModel{
    constructor(
    public name: string, 
    public ngVersion: string, 
    public nodeVersion: string, 
    public npmVersion: string, 
    public ngMaterialVersion: string, 
    public notes: string
    ){}
}