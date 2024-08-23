import { $Enums } from '@prisma/client';

// Tipagem para dispositivos
type IDevices = {
  [key in $Enums.campaignDevices]: number;
};

// Tipagem para navegadores, definidos dinamicamente
interface IBrowsers {
  [browserName: string]: number;
}

// Tipagem para as informações de uma região específica
interface IStateInfo {
  devices: IDevices;
  browsers: IBrowsers;
  totalAccesses: number;
  deniedAccesses: number;
  allowedAccesses: number;
}

// Tipagem para a região `allRegions` de um país
interface IAllRegionsInfo {
  devices: IDevices;
  browsers: IBrowsers;
  totalAccesses: number;
  deniedAccesses: number;
  allowedAccesses: number;
}

// Tipagem para o objeto principal que contém todos os dados
export interface ICampaignMetricCountry {
  allRegions: IAllRegionsInfo;
  [stateCode: string]: IStateInfo;
}
