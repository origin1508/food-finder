import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: "ap-northeast-2",
});

const userProfileImageUpload = multer({
  storage: multerS3({
    s3,
    acl: "public-read-write",
    bucket: "foodfinder-static-storage",
    key: function (req, file, cb) {
      cb(
        null,
        `userProfileImage/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
});

const recipeImageUpload = (directory, userId) => {
  return multer({
    storage: multerS3({
      s3,
      acl: "public-read-write",
      bucket: "foodfinder-static-storage",
      key: function (req, file, cb) {
        cb(
          null,
          `${directory}/${userId}/${Date.now()}_${path.basename(
            file.originalname
          )}`
        );
      },
    }),
  });
};

export { userProfileImageUpload, recipeImageUpload };
