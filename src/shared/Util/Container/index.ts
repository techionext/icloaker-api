import { RepositoryCampaign } from 'Repositories/Campaign/Postgres/RepositoryCampaign';
import { RepositoryCampaignLog } from 'Repositories/CampaignLog/Postgres/RepositoryCampaignLog';
import { RepositoryDashboard } from 'Repositories/Dashboard/Postgres/RepositoryDashboard';
import { RepositoryDomain } from 'Repositories/Domain/Postgres/RepositoryDomain';
import { RepositoryRecoverPassword } from 'Repositories/RecoverPassword/Postgres/RepositoryRecoverPassword';
import { RepositoryUser } from 'Repositories/User/Postgres/RepositoryUser';
import { container } from 'tsyringe';

container.registerSingleton<RepositoryUser>('RepositoryUser', RepositoryUser);
container.registerSingleton<RepositoryDomain>('RepositoryDomain', RepositoryDomain);
container.registerSingleton<RepositoryCampaign>('RepositoryCampaign', RepositoryCampaign);
container.registerSingleton<RepositoryDashboard>('RepositoryDashboard', RepositoryDashboard);
container.registerSingleton<RepositoryCampaignLog>('RepositoryCampaignLog', RepositoryCampaignLog);
container.registerSingleton<RepositoryRecoverPassword>('RepositoryRecoverPassword', RepositoryRecoverPassword);
