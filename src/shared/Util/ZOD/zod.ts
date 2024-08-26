import { z, ZodError } from 'zod';

import { ErrorDictionary } from '../ErrorDictionary';
import { AppError } from '../Errors/AppError';
import { ZodParseError } from '../Errors/ZodError';

interface IZODVerifyParse<T extends z.ZodTypeAny> {
  schema: T;
  data: unknown;
}

export const ZODVerifyParse = <T extends z.ZodTypeAny>({ schema, data }: IZODVerifyParse<T>): z.infer<T> => {
  try {
    const resultParse = schema.parse(data);
    return resultParse;
  } catch (error: any) {
    // console.error(error);

    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => {
        const field = formatPath(issue.path);
        const message = generateErrorMessage(issue);

        return `Campo '${field}': ${message}`;
      });

      throw new ZodParseError(ErrorDictionary.SYSTEM.zodError, errorMessages, 422);
    }

    throw new AppError(ErrorDictionary.SYSTEM.unknownError);
  }
};

const formatPath = (path: (string | number)[]): string => {
  return path
    .map((segment, index) => {
      if (typeof segment === 'number') {
        return `[${segment}]`;
      }

      return index === 0 ? segment : `.${segment}`;
    })
    .join('');
};

const generateErrorMessage = (issue: z.ZodIssue): string => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected.includes(' | ')) {
        return `Esperado tipo 'enum', mas recebeu tipo '${issue.received}'`;
      }
      return `Esperado tipo '${issue.expected}', mas recebeu tipo '${issue.received}'`;

    case z.ZodIssueCode.invalid_literal:
      return `Esperado valor literal '${issue.expected}'`;

    case z.ZodIssueCode.unrecognized_keys:
      return `Chaves não reconhecidas no objeto: ${issue.keys.join(', ')}`;

    case z.ZodIssueCode.invalid_union:
      return `Valor não corresponde a nenhum dos tipos permitidos`;

    case z.ZodIssueCode.invalid_union_discriminator:
      return `Discriminador de união inválido. Esperado '${issue.options.join(', ')}'`;

    case z.ZodIssueCode.invalid_enum_value: {
      const isArray = issue.path.some((segment) => typeof segment === 'number');
      const options = issue.options.join(', ');

      return isArray
        ? `Enviar como array e os valores possíveis são: ${options}. Mas recebeu '${issue.received}'`
        : `Os valores possíveis são: ${options}. Mas recebeu '${issue.received}'`;
    }

    case z.ZodIssueCode.invalid_arguments:
      return `Argumentos de função inválidos`;

    case z.ZodIssueCode.invalid_return_type:
      return `Tipo de retorno de função inválido`;

    case z.ZodIssueCode.invalid_date:
      return `Data inválida`;

    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') return `Esperado um email válido`;
      if (issue.validation === 'url') return `Esperado uma URL válida`;
      if (issue.validation === 'uuid') return `Esperado um UUID válido`;
      if (issue.validation === 'regex') return `Esperado um valor que corresponda ao padrão`;
      if (issue.validation === 'cuid') return `Esperado um CUID válido`;
      if (issue.validation === 'ip') return `Esperado um endereço IP válido`;
      if (issue.validation === 'datetime') return `Esperado uma data e hora válidas`;
      return `Valor de string inválido`;

    case z.ZodIssueCode.too_small:
      if (issue.type === 'array') {
        return `Esperado no mínimo ${issue.minimum} elementos`;
      } else if (issue.type === 'string') {
        return `Esperado no mínimo ${issue.minimum} caracteres`;
      } else if (issue.type === 'number') {
        return `Valor muito pequeno, esperado no mínimo ${issue.minimum}`;
      }
      return `Valor muito pequeno`;

    case z.ZodIssueCode.too_big:
      if (issue.type === 'array' || issue.type === 'string') {
        return `Esperado no máximo ${issue.maximum} elementos`;
      } else if (issue.type === 'number') {
        return `Valor muito grande, esperado no máximo ${issue.maximum}`;
      }
      return `Valor muito grande`;

    case z.ZodIssueCode.custom:
      return `${issue.message}`;

    case z.ZodIssueCode.invalid_intersection_types:
      return `Intersecção de tipos inválida`;

    case z.ZodIssueCode.not_multiple_of:
      return `Valor deve ser múltiplo de ${issue.multipleOf}`;

    case z.ZodIssueCode.not_finite:
      return `Esperado valor finito`;

    default:
      return `Erro desconhecido: ${issue}`;
  }
};
