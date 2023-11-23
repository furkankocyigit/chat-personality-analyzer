import { HttpStatusCode } from './StatusMessages';

export class ErrorWithCode extends Error {
    code: HttpStatusCode;
    constructor(message: string, code: HttpStatusCode) {
        super(message);
        this.code = code;
    }
}
