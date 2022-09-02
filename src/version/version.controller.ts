import { Controller, Get, Response } from '@nestjs/common';
import { VersionService } from './version.service';
import { Response as Res } from 'express';

@Controller('version')
export class VersionController {
  constructor(private versionService: VersionService) {}

  @Get()
  async show(@Response() res: Res) {
    const result = await this.versionService.show();

    return res.send(result);
  }
}
