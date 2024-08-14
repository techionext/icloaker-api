import { recoverPassword } from '@prisma/client';

export namespace ICreateDTO {
  export type Params = {
    id: string;
    userId: string;
    expirationAt: Date;
  };
}

export namespace IFindByIdDTO {
  export type Params = {
    id: string;
  };

  export type Result = {
    isExists: boolean;
    data: recoverPassword | null;
  };
}

export namespace IFindByUserIdDTO {
  export type Params = {
    userId: string;
  };

  export type Result = {
    isExists: boolean;
    data: recoverPassword | null;
  };
}

export namespace IDeleteByIdDTO {
  export type Params = {
    id: string;
  };
}

export interface IRepositoryRecoverPassword {
  Create(data: ICreateDTO.Params): Promise<void>;

  FindById(data: IFindByIdDTO.Params): Promise<IFindByIdDTO.Result>;

  FindByUserId(data: IFindByUserIdDTO.Params): Promise<IFindByUserIdDTO.Result>;

  DeleteById(data: IDeleteByIdDTO.Params): Promise<void>;
}
