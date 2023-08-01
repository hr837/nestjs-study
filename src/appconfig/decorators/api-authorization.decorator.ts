import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constant';

/** 开放的接口 */
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

// TODO Role 权限的接口
