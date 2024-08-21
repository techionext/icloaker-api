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
  async Update(data: IUpdateDTO.Params) {
    await prisma.campaign.update({
      where: {
        id: data.id,
      },
      data: {
        origin: data.origin,
        googleSources: data.googleSources,
        name: data.name,
        domain: data.domain,
        safePage: data.safePage,
        safePageMethod: data.safePageMethod,
        offerPage: data.offerPage,
        offerPageMethod: data.offerPageMethod,
        languages: data.languages,
        countries: data.countries,
        devices: data.devices,
        domainStatus: data.domainStatus,
        manualReview: data.manualReview,
        pageType: data.pageType,
        disclaimer: data.disclaimer,
        companyName: data.companyName,
        address: data.address,
        vat: data.vat,
        supportPhone: data.supportPhone,
        supportEmail: data.supportEmail,
      },
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
  async Create(data: ICreateDTO.Params) {
    await prisma.campaign.create({
      data: {
        id: data.id,
        vat: data.vat,
        logo: data.logo,
        name: data.name,
        slug: data.slug,
        domain: data.domain,
        userId: data.userId,
        origin: data.origin,
        address: data.address,
        devices: data.devices,
        pageType: data.pageType,
        safePage: data.safePage,
        languages: data.languages,
        countries: data.countries,
        offerPage: data.offerPage,
        disclaimer: data.disclaimer,
        companyName: data.companyName,
        supportPhone: data.supportPhone,
        supportEmail: data.supportEmail,
        domainStatus: data.domainStatus,
        manualReview: data.manualReview,
        safePageMethod: data.safePageMethod,
        offerPageMethod: data.offerPageMethod,
        googleSources: data.googleSources,
      },
    });
  }
}
