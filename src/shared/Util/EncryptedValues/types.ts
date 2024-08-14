export namespace ICipherCripto {
  export type params = {
    data: string;
  };
}
export namespace IDecipherCripto {
  export type params = {
    data: string;
  };
}

export interface IGenericMethodsCryptoData {
  cipher: (data: ICipherCripto.params) => string;
  decipher: (data: IDecipherCripto.params) => string;
}
