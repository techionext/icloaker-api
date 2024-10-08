import { $Enums, User, MagicLink, CollaboratorInvite } from '@prisma/client';

export namespace IGetByEmailDTO {
  export type Params = {
    email: string;
    onlyActive?: boolean;
  };

  export type Result = {
    isExists: boolean;
    data: User | null;
  };
}

export namespace IGetByIdDTO {
  export type Params = {
    id: string;
  };

  export type Result = {
    isExists: boolean;
    data: User | null;
  };
}

export namespace ICreateUserDTO {
  export type Params = {
    id: string;
    phone?: string;
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
    data: Omit<User, 'password'>[];
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
    phone?: string;
    role?: $Enums.userRole;
  };
}

export namespace IFindByEmailDTO {
  export type Params = {
    email: string;
  };

  export type Result = {
    isExists: boolean;
  };
}

export namespace IFindByIdDTO {
  export type Params = {
    id: string;
  };

  export type Result = {
    isExists: boolean;
  };
}

export namespace IUpdateCredentialsDTO {
  export type Params = {
    id: string;
    email: string;
    password: string;
  };
}
export namespace IGetAvatarDTO {
  export type Params = {
    id: string;
  };

  export type Result = {
    data: {
      avatar: string | null;
      avatarKey: string | null;
    } | null;
    isExists: boolean;
  };
}
export namespace IUpdateAvatarDTO {
  export type Params = {
    id: string;
    avatar: string;
    avatarKey: string;
  };
}
export namespace IDeleteAvatarDTO {
  export type Params = {
    id: string;
  };
}

export namespace ICreateCollaboratorInviteDTO {
  export type Params = {
    id: string;
    email: string;
  };
}

export namespace IGetCollaboratorInviteByEmailDTO {
  export type Params = {
    email: string;
  };
  export type Result = {
    isExists: boolean;
    data: CollaboratorInvite | null;
  };
}

export namespace IGetCollaboratorInviteByIdDTO {
  export type Params = {
    id: string;
  };
  export type Result = {
    isExists: boolean;
    data: CollaboratorInvite | null;
  };
}

export namespace IDeleteCollaboratorInviteDTO {
  export type Params = {
    id: string;
  };
}

export namespace IChangeRoleDTO {
  export type Params = {
    id: string;
    role: Exclude<$Enums.userRole, 'ROOT'>;
  };
}

export namespace ICreateMagicLinkDTO {
  export type Params = {
    id: string;
    userId: string;
  };
}

export namespace IGetMagicLinkByIdDTO {
  export type Params = {
    id: string;
  };
  export type Result = {
    isExists: boolean;
    data: MagicLink | null;
  };
}

export namespace IDeleteMagicLinkDTO {
  export type Params = {
    id: string;
  };
}

export interface IRepositoryUser {
  Create(data: ICreateUserDTO.Params): Promise<void>;
  GetByEmail(data: IGetByEmailDTO.Params): Promise<IGetByEmailDTO.Result>;
  GetById(data: IGetByIdDTO.Params): Promise<IGetByIdDTO.Result>;
  UpdatePassword(data: IUpdatePasswordDTO.Params): Promise<void>;
  DisableById(data: IDisableByIdDTO.Params): Promise<void>;
  Get(data: IGetDTO.Params): Promise<IGetDTO.Result>;
  Update(data: IUpdateDTO.Params): Promise<void>;
  FindByEmail(data: IFindByEmailDTO.Params): Promise<IFindByEmailDTO.Result>;
  FindById(data: IFindByIdDTO.Params): Promise<IFindByIdDTO.Result>;
  UpdateCredentials(data: IUpdateCredentialsDTO.Params): Promise<void>;
  GetAvatar(data: IGetAvatarDTO.Params): Promise<IGetAvatarDTO.Result>;
  UpdateAvatar(data: IUpdateAvatarDTO.Params): Promise<void>;
  DeleteAvatar(data: IDeleteAvatarDTO.Params): Promise<void>;
  ChangeRole(data: IChangeRoleDTO.Params): Promise<void>;

  CreateCollaboratorInvite(data: ICreateCollaboratorInviteDTO.Params): Promise<void>;
  GetCollaboratorInviteByEmail(data: IGetCollaboratorInviteByEmailDTO.Params): Promise<IGetCollaboratorInviteByEmailDTO.Result>;
  GetCollaboratorInviteById(data: IGetCollaboratorInviteByIdDTO.Params): Promise<IGetCollaboratorInviteByIdDTO.Result>;
  DeleteCollaboratorInvite(data: IDeleteCollaboratorInviteDTO.Params): Promise<void>;

  CreateMagicLink(data: ICreateMagicLinkDTO.Params): Promise<void>;
  GetMagicLinkById(data: IGetMagicLinkByIdDTO.Params): Promise<IGetMagicLinkByIdDTO.Result>;
  DeleteMagicLink(data: IDeleteMagicLinkDTO.Params): Promise<void>;
}
