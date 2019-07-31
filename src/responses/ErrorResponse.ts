import SuccessResponse from './BaseResponse';

export default abstract class ErrorResponse extends SuccessResponse {
    constructor(protected readonly extra?: any) {
        super();
    }
}
