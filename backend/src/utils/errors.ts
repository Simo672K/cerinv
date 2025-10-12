import { NextFunction, Request, Response } from "express";

const responseError = (code: number, message: String, error: string) => ({
  httpStatusCode: code,
  error,
  message,
});

const controllerErrorRecoverer =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | void
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error("Controller error:", error);
      res
        .status(500)
        .json(
          responseError(
            500,
            "An error occurred on the server, try again later.",
            "INTERNAL_SERVER_ERROR"
          )
        );
    }
  };

export { responseError, controllerErrorRecoverer };
