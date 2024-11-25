import { IsNumber, IsString, MaxLength } from "class-validator";

export class PurchasePlanDto {
    @IsString()
    @MaxLength(50)
    description: string;

    @IsNumber({}, { message: 'Invalid product id'})
    product_id: number;

    @IsNumber({}, { message: "Invalid quantity" })
    quantity: number;
}
