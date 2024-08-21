import { prisma } from '@config/DataBase/Prisma/Index';

import {
  ICreateDTO,
  IDeleteDTO,
  IFindByIdDTO,
  IFindDomainDTO,
  IGetByIdDTO,
  IGetDTO,
  IRepositoryCampaign,
  IUpdateAllowConfigDTO,
  IUpdateDenyConfigDTO,
  IUpdateDTO,
} from '../IRepositoryCampaign';

export class RepositoryCampaign implements IRepositoryCampaign {
  async Get({ page, pageSize, userId, filter }: IGetDTO.Params) {
    const [data, total] = await prisma.$transaction([
      prisma.campaign.findMany({
        where: {
          ...(userId && { userId }),
          ...(filter && { OR: [{ name: { contains: filter, mode: 'insensitive' } }, { domain: { contains: filter, mode: 'insensitive' } }] }),
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.campaign.count({
        where: {
          ...(userId && { userId }),
          ...(filter && { OR: [{ name: { contains: filter, mode: 'insensitive' } }, { domain: { contains: filter, mode: 'insensitive' } }] }),
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
  async Delete({ id }: IDeleteDTO.Params) {
    await prisma.campaign.delete({
      where: { id },
    });
  }
  async GetById({ id, userId }: IGetByIdDTO.Params) {
    const data = await prisma.campaign.findFirst({
      where: { id, ...(userId && { userId }) },
    });

    return {
      data,
      isExists: !!data,
    };
  }
  async Update({ id, countries, devices, domain, domainStatus, languages, manualReview, name, offerPage, origin, safePage }: IUpdateDTO.Params) {
    await prisma.campaign.update({
      where: {
        id,
      },
      data: { countries, devices, domain, domainStatus, languages, manualReview, name, offerPage, origin, safePage },
    });
  }
  async UpdateDenyConfig({
    id,
    antiSpy,
    denyCountries,
    denyIps,
    denyIsps,
    denyLanguages,
    denyQueries,
    denyRefererOrigins,
  }: IUpdateDenyConfigDTO.Params) {
    await prisma.campaign.update({
      where: {
        id,
      },
      data: {
        denyIps,
        antiSpy,
        denyIsps,
        denyQueries,
        denyCountries,
        denyLanguages,
        denyRefererOrigins,
      },
    });
  }
  async UpdateAllowConfig({ allowIps, allowIsps, allowQueries, id, allowRefererOrigins }: IUpdateAllowConfigDTO.Params) {
    await prisma.campaign.update({
      where: {
        id,
      },
      data: {
        allowIps,
        allowIsps,
        allowQueries,
        allowRefererOrigins,
      },
    });
  }
  async FindById({ id, userId }: IFindByIdDTO.Params) {
    const data = await prisma.campaign.count({
      where: { id, ...(userId && { userId }) },
    });

    return {
      isExists: !!data,
    };
  }
  async FindDomain({ domain }: IFindDomainDTO.Params) {
    const data = await prisma.campaign.count({
      where: { domain, domainStatus: { equals: 'ACTIVE' } },
    });

    return {
      isExists: !!data,
    };
  }
  async Create({
    id,
    devices,
    domain,
    name,
    origin,
    countries,
    domainStatus,
    languages,
    manualReview,
    offerPage,
    safePage,
    userId,
  }: ICreateDTO.Params) {
    await prisma.campaign.create({
      data: {
        id,
        name,
        domain,
        userId,
        origin,
        devices,
        safePage,
        languages,
        countries,
        offerPage,
        domainStatus,
        manualReview,
      },
    });
  }
}
