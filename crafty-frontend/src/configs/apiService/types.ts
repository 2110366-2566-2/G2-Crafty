export enum ApiStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ApiSuccessResponse<T> {
  status: ApiStatus.SUCCESS;
  data: T;
}

export interface ApiErrorResponse {
  status: ApiStatus.ERROR;
  errorMessage: string;
}

export type ApiResponseType<T> = ApiSuccessResponse<T> | ApiErrorResponse;
