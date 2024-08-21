import { prisma } from '@config/DataBase/Prisma/Index';

import { ICreateDTO, IDeleteDTO, IFindByIdDTO, IFindByUrlDTO, IGetByIdDTO, IGetDTO, IRepositoryDomain, IUpdateDTO } from '../IRepositoryDomain';

export class RepositoryDomain implements IRepositoryDomain {
  async Delete({ id }: IDeleteDTO.Params) {
    await prisma.domain.delete({
      where: {
        id,
      },
    });
  }
  async Get({ page, pageSize, userId, filter }: IGetDTO.Params): Promise<IGetDTO.Result> {
    const [data, total] = await prisma.$transaction([
      prisma.domain.findMany({
        where: {
          userId,
          ...(filter && {
            url: { contains: filter, mode: 'insensitive' },
          }),
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.domain.count({
        where: {
          userId,
          ...(filter && {
            url: { contains: filter, mode: 'insensitive' },
          }),
        },
      }),
    ]);

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
  async Update({ id, status, url }: IUpdateDTO.Params) {
    await prisma.domain.update({
      where: {
        id,
      },
      data: {
        status,
        url,
      },
    });
  }
  async GetById({ id, userId }: IGetByIdDTO.Params) {
    const data = await prisma.domain.findFirst({
      where: { id, userId },
    });

    return {
      isExists: !!data,
      data,
    };
  }
  async FindById({ id, userId }: IFindByIdDTO.Params) {
    const data = await prisma.domain.count({
      where: { id, userId },
    });

    return {
      isExists: !!data,
    };
  }
  async Create({ id, url, userId }: ICreateDTO.Params) {
    await prisma.domain.create({
      data: {
        id,
        url,
        userId,
      },
    });
  }
  async FindByUrl({ url, userId }: IFindByUrlDTO.Params) {
    const data = await prisma.domain.count({
      where: { url, userId },
    });

    return {
      isExists: !!data,
    };
  }
}
