import { StringValueObject } from "../../shared/domain/valueObject/stringValueObject";
import { CustomerEmailIsInvalid } from "./customerEmailIsInvalid";

export class CustomerEmail extends StringValueObject{
    
    constructor(value: string) {
        super(value);
        this.ensureIsEmailValid(value);
    }

    private ensureIsEmailValid(value: string):void {
        const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;            
        const result: boolean = expression.test(value);
        if (!result)
        {   
            throw new CustomerEmailIsInvalid(`The Customer email <${value}> is invalid`);
        }
    }
}