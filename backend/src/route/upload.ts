import express from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import { sendResponse } from '../utils/sendResponse';
import cloudinary from '../config/cloudinary';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const buffer = req.file?.buffer;
    if (!buffer) {
      return sendResponse(res, 400, false, 'No file provided');
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return sendResponse(res, 500, false, 'Cloudinary upload failed', { error });
        }

        if (result?.secure_url) {
          return sendResponse(res, 200, true, 'Upload successful', { url: result.secure_url });
        }

        return sendResponse(res, 500, false, 'Upload failed');
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  } catch (err) {
    console.error("Upload route error:", err);
    return sendResponse(res, 500, false, 'Internal server error', {
      error: (err as Error).message
    });
  }
});
export default router;