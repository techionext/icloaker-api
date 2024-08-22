import { prisma } from '@config/DataBase/Prisma/Index';

import { ICreateDTO, IGetDTO, IRepositoryCampaignLog } from '../IRepositoryCampaignLog';

export class RepositoryCampaignLog implements IRepositoryCampaignLog {
  async Get({ campaignId, page, pageSize }: IGetDTO.Params) {
    const [data, total] = await prisma.$transaction([
      prisma.campaignLog.findMany({
        where: {
          campaignId,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.campaignLog.count({
        where: {
          campaignId,
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
  async Create({ campaignId, apiResponse, ipInfo, pageUrl, redirectTo, refererPage, requestInfo }: ICreateDTO.Params) {
    await prisma.campaignLog.create({
      data: {
        campaignId,
        apiResponse,
        ipInfo,
        pageUrl,
        redirectTo,
        refererPage,
        requestInfo,
      },
    });
  }
}
