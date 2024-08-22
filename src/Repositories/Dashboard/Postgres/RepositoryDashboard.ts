import { prisma } from '@config/DataBase/Prisma/Index';

import { IpInfo } from '@shared/models/IpInfo';

import { IMetricsDTO, IRepositoryDashboard } from '../IRepositoryDashboard';

export class RepositoryDashboard implements IRepositoryDashboard {
  async Metrics({ endDate, startDate, userId }: IMetricsDTO.Params) {
    const data = await prisma.campaignLog.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: new Date(`${startDate} 00:00:00`),
            },
          },
          {
            createdAt: {
              lte: new Date(`${endDate} 23:59:59`),
            },
          },
          {
            campaign: {
              userId,
            },
          },
        ],
      },
      select: {
        redirectTo: true,
        ipInfo: true,
        createdAt: true,
        campaign: {
          select: {
            offerPage: true,
            safePage: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const typedData = data.map((entry) => ({
      ...entry,
      ipInfo: entry.ipInfo as IpInfo,
    }));

    return { data: typedData };
  }
}
