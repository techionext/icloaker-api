import { prisma } from '@config/DataBase/Prisma/Index';

import {
  ICreateUserDTO,
  IRepositoryUser,
  IGetByIdDTO,
  IGetByEmailDTO,
  IUpdatePasswordDTO,
  IDisableByIdDTO,
  IGetDTO,
  IUpdateDTO,
  IFindByEmailDTO,
  IFindByIdDTO,
  IUpdateCredentialsDTO,
  IGetAvatarDTO,
  IDeleteAvatarDTO,
  IUpdateAvatarDTO,
} from '../IRepositoryUser';

export class RepositoryUser implements IRepositoryUser {
  async UpdateAvatar({ avatar, avatarKey, id }: IUpdateAvatarDTO.Params) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar,
        avatarKey,
      },
    });
  }

  async DeleteAvatar({ id }: IDeleteAvatarDTO.Params) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar: null,
        avatarKey: null,
      },
    });
  }

  async GetAvatar({ id }: IGetAvatarDTO.Params): Promise<IGetAvatarDTO.Result> {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        avatar: true,
        avatarKey: true,
      },
    });

    return {
      data,
      isExists: !!data,
    };
  }
  async UpdateCredentials({ email, id, password }: IUpdateCredentialsDTO.Params) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password,
      },
    });
  }

  async FindByEmail({ email }: IFindByEmailDTO.Params) {
    const data = await prisma.user.count({
      where: {
        email,
      },
    });

    return {
      isExists: !!data,
    };
  }

  async FindById({ id }: IFindByIdDTO.Params) {
    const data = await prisma.user.count({
      where: {
        id,
      },
    });

    return {
      isExists: !!data,
    };
  }

  async Update({ id, name, phone, role }: IUpdateDTO.Params) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        phone,
        role,
      },
    });
  }

  async Get({ page, pageSize, filter, onlyCollaborators }: IGetDTO.Params) {
    const [data, total] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          ...(onlyCollaborators && { role: 'COLLABORATOR' }),
          ...(filter && {
            OR: [
              {
                name: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count({
        where: {
          ...(onlyCollaborators && { role: 'COLLABORATOR' }),
          ...(filter && {
            OR: [
              {
                name: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },
      }),
    ]);

    return {
      data: data.map((user) => {
        // eslint-disable-next-line no-unused-vars
        const { password, ...restUser } = user;
        return restUser;
      }),
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async DisableById({ id }: IDisableByIdDTO.Params) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }

  async UpdatePassword({ id, password }: IUpdatePasswordDTO.Params) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  async GetById({ id }: IGetByIdDTO.Params) {
    const dataUser = await prisma.user.findUnique({
      where: { id },
    });

    return {
      isExists: !!dataUser,
      data: dataUser,
    };
  }

  async GetByEmail({ email, onlyActive }: IGetByEmailDTO.Params) {
    const dataUser = await prisma.user.findUnique({
      where: {
        email,
        ...(onlyActive && { active: { equals: true } }),
      },
    });

    return {
      isExists: !!dataUser,
      data: dataUser,
    };
  }

  async Create({ email, id, name, password, phone }: ICreateUserDTO.Params) {
    await prisma.user.create({
      data: {
        id,
        name,
        email,
        phone,
        password,
      },
    });
  }
}
