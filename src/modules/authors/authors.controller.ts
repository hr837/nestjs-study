import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: '新建作者' })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: '查询作者' })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: '根据ID查找作者' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: '根据ID修改作者' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({ summary: '根据ID删除作者' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
