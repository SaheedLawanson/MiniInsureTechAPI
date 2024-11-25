import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  ParseIntPipe,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { GetPolicyQueryDto } from './dto/get-policy-query.dto';
import { ActivatePolityDto } from './dto/activate-policy.dto';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get('all')
  async findAll(
    @Query(new ValidationPipe()) filter: GetPolicyQueryDto) {
    return await this.policyService.findAll({
      ...filter,
      status: filter.status === 'true' ? true : false,
    });
  }

  @Post('activate')
  async activate(@Body(new ValidationPipe()) activatePolityDto: ActivatePolityDto) {
    return await this.policyService.activate(activatePolityDto);
  }
}
