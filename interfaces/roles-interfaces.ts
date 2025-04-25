

export interface Role{
    roleId:string,
    name: string,
    state: boolean,
    permissions: Permission[]
  }

  interface Permission {
    permissionsId: string,
    modules: Module,
    moduleId: string,
    delete:boolean,
    read:boolean,
    roleId:string,
    update:boolean,
    write:boolean
  }
interface Module{
    name: string, 
}

