import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface User {
      _id: Types.ObjectId;
    }

    interface Request {
      user?: User;
    }
  }
}
