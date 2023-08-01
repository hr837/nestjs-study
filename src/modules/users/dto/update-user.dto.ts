import { IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  /**
   * 旧密码
   */
  @IsNotEmpty()
  oldPwd: string;

  /**
   * 新密码
   */
  @IsNotEmpty()
  @Length(6, 20)
  newPwd: string;
}
