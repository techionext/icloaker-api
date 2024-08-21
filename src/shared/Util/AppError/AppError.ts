interface IAppErrorContent {
  message: string;
  codeIntern: string;
}

export class AppError {
  public readonly statusCode: number;
  public readonly content: IAppErrorContent;

  constructor(content: IAppErrorContent, statusCode = 400) {
    this.content = content;
    this.statusCode = statusCode;
  }
}
