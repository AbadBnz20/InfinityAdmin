export interface Admin {
    IdAdmin: string,
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phone: string,
    birthdate: string,
    status: boolean,
    country: { name: string },
    role: { name: string },
    location: { name:string },
    position: { name: string },
    department: { name: string },
    state: { name: string }
  }