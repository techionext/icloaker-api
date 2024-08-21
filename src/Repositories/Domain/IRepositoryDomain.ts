import { $Enums, Domain } from '@prisma/client';

export namespace ICreateDTO {
  export type Params = {
    id: string;
    url: string;
    userId: string;
  };
}
export namespace IFindByUrlDTO {
  export type Params = {
    url: string;
    userId: string;
  };
  export type Result = {
    isExists: boolean;
  };
}
export namespace IFindByIdDTO {
  export type Params = {
    id: string;
    userId: string;
  };
  export type Result = {
    isExists: boolean;
  };
}
export namespace IGetByIdDTO {
  export type Params = {
    id: string;
    userId: string;
  };
  export type Result = {
    isExists: boolean;
    data: Domain | null;
  };
}
export namespace IUpdateDTO {
  export type Params = {
    id: string;
    url?: string;
    status?: $Enums.domainStatus;
  };
}
export namespace IDeleteDTO {
  export type Params = {
    id: string;
  };
}
export namespace IGetDTO {
  export type Params = {
    page: number;
    pageSize: number;
    filter?: string;
    userId: string;
  };
  export type Result = {
    data: Domain[];
    meta: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface IRepositoryDomain {
  Create(data: ICreateDTO.Params): Promise<void>;
  FindByUrl(data: IFindByUrlDTO.Params): Promise<IFindByUrlDTO.Result>;
  FindById(data: IFindByIdDTO.Params): Promise<IFindByIdDTO.Result>;
  GetById(data: IGetByIdDTO.Params): Promise<IGetByIdDTO.Result>;
  Update(data: IUpdateDTO.Params): Promise<void>;
  Delete(data: IDeleteDTO.Params): Promise<void>;
  Get(data: IGetDTO.Params): Promise<IGetDTO.Result>;
}
