// types/express.d.ts (or just express.d.ts if you're putting it in the root)
import { IUser } from './user.model'; // Adjust the import path as needed

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Define the type for the user property
        }
    }
}
