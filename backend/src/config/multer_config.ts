import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = path.join(__dirname, '..', 'uploads\\temp');
		fs.mkdirSync(uploadPath, { recursive: true });
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix);
	},
});

export const upload = multer({ storage: storage });
