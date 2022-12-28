const catchAsync: Function =
  (fn: (arg0: any, arg1: any, arg2: any) => any) => async (req: any, res: any, next: (arg0: unknown) => void) => {
    try {
      return await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default catchAsync;
