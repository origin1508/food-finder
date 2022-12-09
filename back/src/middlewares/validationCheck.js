import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError";

const validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.setBadRequest(errors["errors"][0]);
  }
  next();
};

export default validatorErrorChecker;
