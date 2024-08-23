import { $Enums } from '@prisma/client';

export type RequestInfo = {
  browser: {
    name: string;
    version: string | null;
  };

  engine: {
    name: string;
    version: string | null;
  };

  os: {
    name: string;
    version: string | null;
    architecture: string | null;
  };

  device: {
    type: $Enums.campaignDevices;
    brand: string | null;
    model: string | null;
  };

  userAgent: string;
} | null;
