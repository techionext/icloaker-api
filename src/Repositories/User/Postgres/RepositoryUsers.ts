import { prisma } from '@config/DataBase/Prisma/Index';

import {
  ICreateUserDTO,
  IRepositoryUsers,
  IFindUserByIdDTO,
  IFindUserByEmailDTO,
  IUpdatePasswordDTO,
  IDisableByIdDTO,
  IGetDTO,
  IUpdateDTO,
} from '../IRepositoryUser';

export class RepositoryUsers implements IRepositoryUsers {
  async Update({ id, email, name, role }: IUpdateDTO.Params) {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        role,
      },
    });
  }

  async Get({ page, pageSize, filter, onlyCollaborators }: IGetDTO.Params) {
    const data = await prisma.users.findMany({
      where: {
        active: { equals: true },
        role: { not: 'ROOT', ...(onlyCollaborators && { equals: 'COLLABORATOR' }) },
        ...(filter && {
          user: {
            OR: [{ name: { contains: filter, mode: 'insensitive' } }, { email: { contains: filter, mode: 'insensitive' } }],
          },
        }),
      },
    });

    const total = await prisma.users.count({
      where: {
        active: { equals: true },
        role: { not: 'ROOT', ...(onlyCollaborators && { equals: 'COLLABORATOR' }) },
        ...(filter && {
          user: {
            OR: [{ name: { contains: filter, mode: 'insensitive' } }, { email: { contains: filter, mode: 'insensitive' } }],
          },
        }),
      },
    });

    return {
      data,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async DisableById({ id }: IDisableByIdDTO.Params) {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }

  async UpdatePassword({ id, password }: IUpdatePasswordDTO.Params) {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  async FindUserById({ id }: IFindUserByIdDTO.Params) {
    const dataUser = await prisma.users.findUnique({
      where: { id },
    });

    return {
      isExists: !!dataUser,
      data: dataUser,
    };
  }

  async FindUserByEmail({ email, onlyActive }: IFindUserByEmailDTO.Params) {
    const dataUser = await prisma.users.findUnique({
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
    await prisma.users.create({
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
