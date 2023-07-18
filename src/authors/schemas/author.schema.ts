import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({
  toJSON: {
    versionKey: false,
    virtuals: true,
  },
})
export class Author {
  id: string;
  /**
   * 名字
   * @example Jone
   */
  @Prop({
    type: String,
    required: true,
  })
  first_name: string;

  /**
   * 家族名
   * @example Steve
   */
  @Prop({
    type: String,
    required: true,
  })
  family_name: string;

  /**
   * 出生日期
   */
  @Prop({
    type: Date,
  })
  date_of_birth?: Date;

  /**
   * 去世日期
   */
  @Prop({
    type: Date,
  })
  date_of_death?: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
