import { applyDecorators } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';
import { dateFormat, dateTimeFormat } from 'src/utils/date.help';

export const TransToDateTime = () => {
  return applyDecorators(
    Transform(({ value }: TransformFnParams) => new Date(value), {
      toClassOnly: true,
    }),
  );
};

export const TransToDateString = () => {
  return applyDecorators(
    Transform(({ value }: TransformFnParams) => dateFormat(value), {
      toPlainOnly: true,
    }),
  );
};

export const TransToDateTimeString = () => {
  return applyDecorators(
    Transform(({ value }: TransformFnParams) => dateTimeFormat(value), {
      toPlainOnly: true,
    }),
  );
};
