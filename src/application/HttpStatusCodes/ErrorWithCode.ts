import { StatusCode } from './StatusMessages';

export class ErrorWithCode extends Error {
    code: StatusCode;
    constructor(message: string, code: StatusCode) {
        super(message);
        this.code = code;
    }
}
