import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageDataDto } from '../dto/page-data.dto';

/**
 * Api分页返回数据说明
 * @param model Class 实体或DTO
 * @returns
 */
export const ApiOkPagedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDataDto) },
          {
            properties: {
              rows: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
                description: '本次返回的数据行',
              },
              total: {
                type: 'number',
                description: '数据总行数',
              },
            },
          },
        ],
      },
    }),
  );
};
