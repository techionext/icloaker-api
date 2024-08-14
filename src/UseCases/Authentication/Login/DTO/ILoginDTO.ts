export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IWppResponseDTO {
  status: string;
  session: string;
  token: string;
  full: string;
}
