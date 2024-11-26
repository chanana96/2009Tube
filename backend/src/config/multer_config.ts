import multer from 'multer'
import multerS3 from 'multer-s3'
import {s3} from './s3_config'
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config()

const BUCKET_NAME = process.env.AWS_BUCKET_NAME

export const upload = multer({
	storage: multerS3({
	  s3: s3,
	  bucket: BUCKET_NAME,
	  acl:'public-read',
	  contentType: multerS3.AUTO_CONTENT_TYPE,

	  key: function (req, file, cb) {
		const fileName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
		req.fileKey = fileName;
  cb(null, fileName);
	  }
	})
  })