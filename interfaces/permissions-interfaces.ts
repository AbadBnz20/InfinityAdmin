export interface Permissions {
  read: boolean;
  write: boolean;
  update: boolean;
  delete: boolean;
  modules: Modules;
}

interface Modules {
  name: string;
  moduleid: string;
}
