import { ResponseError } from 'common';

/**
 * Helper function to create error response
 * @param message error message
 * @returns error response
 */
export const errorResponse: (message: string) => ResponseError = (message) => {
  console.log(message);
  return {
    error: true,
    message,
  };
};
