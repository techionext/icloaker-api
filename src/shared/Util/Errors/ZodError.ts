interface IZodParseErrorContent {
  message: string;
  codeIntern: string;
}

export class ZodParseError {
  public readonly statusCode: number;
  public readonly errors: string[];
  public readonly content: IZodParseErrorContent;

  constructor(content: IZodParseErrorContent, errors: string[], statusCode = 400) {
    this.content = content;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
