import express from 'express';
import { govJobs, moreJob, passionJobs, privateJobs, qualifyJobs,} from '../controllers/job.controller.js';
import { limiter } from '../middleware/expressRateLimit.js';

const router = express.Router()


router.get("/private",privateJobs)
router.get("/gov", govJobs)
router.get("/passion",limiter(3),passionJobs)
router.get("/qualify",limiter(3),qualifyJobs)
router.get("/more",limiter(1),moreJob)


export default router;