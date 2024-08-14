import { prisma } from '@config/DataBase/Prisma/Index';

import { ICreateDTO, IDeleteByIdDTO, IFindByIdDTO, IFindByUserIdDTO, IRepositoryRecoverPassword } from '../IRepositoryRecoverPassword';

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

  async FindById({ id }: IFindByIdDTO.Params) {
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

  async FindByUserId({ userId }: IFindByUserIdDTO.Params) {
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
