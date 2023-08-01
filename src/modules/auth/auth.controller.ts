import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { SkipAuth } from 'src/appconfig/decorators/api-authorization.decorator';

@ApiTags('授权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  signIn(@Body() login: LoginDto) {
    return this.authService.signIn(login.userName, login.password);
  }
}
