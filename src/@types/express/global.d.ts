/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */

import express, { json, Request, Response, NextFunction } from 'express';

import { IGenerateToken } from '@shared/Util/configToken/generateToken';

declare module 'express' {
  export interface Request {
    body: {
      token: IGenerateToken;
      [key: string]: any;
    };
  }
}
