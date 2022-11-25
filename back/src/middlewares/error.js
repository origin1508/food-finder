import ApiError from "../utils/ApiError";

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
    });
    return;
  }
  res.status(500).json({
    success: false,
    message: err.message
  });
};
