import { prisma } from '@config/DataBase/Prisma/Index';

import { ICreateDTO, IDeleteByIdDTO, IGetByIdDTO, IGetByUserIdDTO, IRepositoryRecoverPassword } from '../IRepositoryRecoverPassword';

export class RepositoryRecoverPassword implements IRepositoryRecoverPassword {
  async Create({ id, userId, expirationAt }: ICreateDTO.Params) {
    await prisma.recoverPassword.create({
      data: {
        id,
        userId,
        expirationAt,
      },
    });
  }

  async GetById({ id }: IGetByIdDTO.Params) {
    const dataRecoverPassword = await prisma.recoverPassword.findFirst({
      where: {
        id,
      },
    });

    return {
      isExists: !!dataRecoverPassword,
      data: dataRecoverPassword,
    };
  }

  async GetByUserId({ userId }: IGetByUserIdDTO.Params) {
    const dataRecoverPassword = await prisma.recoverPassword.findFirst({
      where: {
        userId,
      },
    });

    return {
      isExists: !!dataRecoverPassword,
      data: dataRecoverPassword,
    };
  }

  async DeleteById({ id }: IDeleteByIdDTO.Params) {
    await prisma.recoverPassword.delete({ where: { id } });
  }
}
