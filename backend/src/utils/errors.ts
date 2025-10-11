const responseError = (code: number, message: String, error: string) => ({
  httpStatusCode: code,
  error,
  message,
});

export { responseError };
