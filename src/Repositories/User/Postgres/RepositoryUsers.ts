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
  IGetUserByProviderDTO,
  ICreateWithProviderDTO,
  IGetWithProfilesDTO,
  ICreateProviderDTO,
} from '../IRepositoryUser';

export class RepositoryUsers implements IRepositoryUsers {
  async CreateProvider({ id, provider, providerEmail, providerId }: ICreateProviderDTO.Params): Promise<void> {
    await prisma.profiles.create({
      data: {
        userId: id,
        provider,
        providerId,
        providerEmail,
      },
    });
  }
  async GetWithProfiles({ id }: IGetWithProfilesDTO.Params) {
    const data = await prisma.users.findFirst({
      where: { id },
      include: {
        profiles: true,
      },
    });

    return {
      data,
      isExists: !!data,
    };
  }
  async CreateWithProvider({ id, name, provider, providerEmail, providerId }: ICreateWithProviderDTO.Params) {
    const data = await prisma.users.create({
      data: {
        id,
        name,
        profiles: {
          create: {
            provider,
            providerId,
            providerEmail,
          },
        },
      },
    });

    return {
      data,
    };
  }
  async GetUserByProvider({ provider, providerId }: IGetUserByProviderDTO.Params) {
    const data = await prisma.users.findFirst({
      where: {
        profiles: {
          some: {
            provider,
            providerId,
          },
        },
      },
    });

    return {
      data,
      isExists: !!data,
    };
  }
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
