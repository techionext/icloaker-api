import { RepositoryDomains } from 'Repositories/Domains/Postgres/RepositoryDomains';
import { RepositoryRecoverPassword } from 'Repositories/RecoverPassword/Postgres/RepositoryRecoverPassword';
import { RepositoryUsers } from 'Repositories/User/Postgres/RepositoryUsers';
import { container } from 'tsyringe';

container.registerSingleton<RepositoryUsers>('RepositoryUsers', RepositoryUsers);
container.registerSingleton<RepositoryRecoverPassword>('RepositoryRecoverPassword', RepositoryRecoverPassword);
container.registerSingleton<RepositoryDomains>('RepositoryDomains', RepositoryDomains);
