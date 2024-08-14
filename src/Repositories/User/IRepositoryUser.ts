import { $Enums, Users } from '@prisma/client';

export namespace IFindUserByEmailDTO {
  export type Params = {
    email: string;
    onlyActive?: boolean;
  };

  export type Result = {
    isExists: boolean;
    data: Users | null;
  };
}

export namespace IFindUserByIdDTO {
  export type Params = {
    id: string;
  };

  export type Result = {
    isExists: boolean;
    data: Users | null;
  };
}

export namespace ICreateUserDTO {
  export type Params = {
    id: string;
    phone: string;
    name: string;
    email: string;
    password: string;
  };
}

export namespace IUpdatePasswordDTO {
  export type Params = {
    id: string;
    password: string;
  };
}

export namespace IDisableByIdDTO {
  export type Params = {
    id: string;
  };
}

export namespace IGetDTO {
  export type Params = {
    page: number;
    pageSize: number;
    filter?: string;
    onlyCollaborators?: boolean;
  };

  export type Result = {
    data: Users[] | null;
    meta: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

export namespace IUpdateDTO {
  export type Params = {
    id: string;
    name?: string;
    email?: string;
    role?: $Enums.userRole;
  };
}

export interface IRepositoryUsers {
  Create(data: ICreateUserDTO.Params): Promise<void>;

  FindUserByEmail(data: IFindUserByEmailDTO.Params): Promise<IFindUserByEmailDTO.Result>;

  FindUserById(data: IFindUserByIdDTO.Params): Promise<IFindUserByIdDTO.Result>;

  UpdatePassword(data: IUpdatePasswordDTO.Params): Promise<void>;

  DisableById(data: IDisableByIdDTO.Params): Promise<void>;

  Get(data: IGetDTO.Params): Promise<IGetDTO.Result>;

  Update(data: IUpdateDTO.Params): Promise<void>;
}
