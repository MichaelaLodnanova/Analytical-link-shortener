export type SuccessResponse<T> = {
  status: 'success';
  data: T;
  message?: string;
};

export type ValidationErrorResponse = {
  status: 'error';
  message: string;
};

export type ErrorResponse = {
  status: 'error';
  data: object;
  message: string;
};
