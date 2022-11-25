import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

const authorizeJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      next(ApiError.setBadRequest("토큰을 전달받지 못함"));
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    const decodedToken = jwt.verify(token, secretKey);

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(ApiError.setUnauthorized("유효기간이 만료된 토큰입니다."));
    }
    if (err.name === "JsonWebTokenError") {
      next(ApiError.setBadRequest("손상된 토큰입니다."));
    }
    next(ApiError.setBadRequest("유효하지 않은 토큰입니다."));
  }
};

export default authorizeJWT;
