import { prisma } from '@config/DataBase/Prisma/Index';

import { ICreateDTO, IDeleteDTO, IFindByIdDTO, IFindByUrlDTO, IGetByIdDTO, IGetDTO, IRepositoryDomains, IUpdateDTO } from '../IRepositoryDomains';

export class RepositoryDomains implements IRepositoryDomains {
  async Delete({ id }: IDeleteDTO.Params) {
    await prisma.domains.delete({
      where: {
        id,
      },
    });
  }
  async Get({ page, pageSize, userId, filter }: IGetDTO.Params): Promise<IGetDTO.Result> {
    const [data, total] = await prisma.$transaction([
      prisma.domains.findMany({
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

      prisma.domains.count({
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
    await prisma.domains.update({
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
    const data = await prisma.domains.findFirst({
      where: { id, userId },
    });

    return {
      isExists: !!data,
      data,
    };
  }
  async FindById({ id, userId }: IFindByIdDTO.Params) {
    const data = await prisma.domains.count({
      where: { id, userId },
    });

    return {
      isExists: !!data,
    };
  }
  async Create({ id, url, userId }: ICreateDTO.Params) {
    await prisma.domains.create({
      data: {
        id,
        url,
        userId,
      },
    });
  }
  async FindByUrl({ url, userId }: IFindByUrlDTO.Params) {
    const data = await prisma.domains.count({
      where: { url, userId },
    });

    return {
      isExists: !!data,
    };
  }
}
