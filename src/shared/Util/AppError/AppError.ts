export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly codeIntern: string;

  constructor(message: string, statusCode = 400, codeIntern: string = '') {
    this.message = message;
    this.statusCode = statusCode;
    this.codeIntern = codeIntern;
  }
}
