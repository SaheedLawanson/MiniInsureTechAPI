import { IsNumber } from "class-validator";

export class ActivatePolityDto {
    @IsNumber()
    policy_id: number;

    @IsNumber()
    user_id: number
}