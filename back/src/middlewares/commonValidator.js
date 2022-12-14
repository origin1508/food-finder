import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const error = ApiError.setBadRequest(errors.errors[0].msg);
  return next(error);
};

export default validate;
