export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  age?: number;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
}
