// Temporary Auth Routes
import express from 'express';
import { tempSignupOAuth, tempSimpleSignup, tempSignin } from '../Controllers/tempAuth.controller.js';
const router = express.Router();
// OAuth callback endpoint (Next.js would redirect here)
router.post('/oauth/signup', tempSignupOAuth);
// Simple email/password signup for testing
router.post('/signup', tempSimpleSignup);
// Simple email/password signin for testing
router.post('/signin', tempSignin);
export default router;
//# sourceMappingURL=tempAuth.routes.js.map