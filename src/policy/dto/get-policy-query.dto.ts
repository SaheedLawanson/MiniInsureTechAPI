import { IsBoolean, IsEnum, IsNumber, IsNumberString, IsOptional } from "class-validator";
import { IsNumeric } from "sequelize-typescript";

export class GetPolicyQueryDto {
    @IsOptional()
    @IsNumberString()
    plan_id?: string;

    @IsOptional()
    @IsEnum(['true', 'false'])
    status?: string;
}