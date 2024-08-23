import { $Enums } from '@prisma/client';

// Tipagem para dispositivos
type IDevices = {
  [key in $Enums.campaignDevices]: number;
};

// Tipagem para navegadores, definidos dinamicamente
interface IBrowsers {
  [browserName: string]: number;
}

// Tipagem para as informações de uma data recente
interface IRecentInfo {
  bots: number;
  safePage: number;
  offerPage: number;
  totalRequests: number;
}

// Tipagem para a todos os dados de um país
interface ICountryInfo {
  devices: IDevices;
  browsers: IBrowsers;
  totalAccesses: number;
  deniedAccesses: number;
  allowedAccesses: number;
}

// Tipagem para o objeto principal que contém todos os dados
export interface ICampaignMetric {
  totalAccesses: number;
  deniedAccesses: number;
  allowedAccesses: number;
  devices: IDevices;
  browsers: IBrowsers;
  recent: {
    [date: string]: IRecentInfo;
  };
  countries: {
    [countryCode: string]: ICountryInfo;
  };
}
