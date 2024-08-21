import { RecoverPassword } from '@prisma/client';

export namespace ICreateDTO {
  export type Params = {
    id: string;
    userId: string;
    expirationAt: Date;
  };
}

export namespace IGetByIdDTO {
  export type Params = {
    id: string;
  };

  export type Result = {
    isExists: boolean;
    data: RecoverPassword | null;
  };
}

export namespace IGetByUserIdDTO {
  export type Params = {
    userId: string;
  };

  export type Result = {
    isExists: boolean;
    data: RecoverPassword | null;
  };
}

export namespace IDeleteByIdDTO {
  export type Params = {
    id: string;
  };
}

export interface IRepositoryRecoverPassword {
  Create(data: ICreateDTO.Params): Promise<void>;

  GetById(data: IGetByIdDTO.Params): Promise<IGetByIdDTO.Result>;

  GetByUserId(data: IGetByUserIdDTO.Params): Promise<IGetByUserIdDTO.Result>;

  DeleteById(data: IDeleteByIdDTO.Params): Promise<void>;
}
