import express from 'express';
import { addJoblist, govJobs, moreJob, passionJobs, privateJobs, qualifyJobs,} from '../controllers/job.controller.js';
import { limiter } from '../middleware/expressRateLimit.js';

const router = express.Router()


router.get("/private",privateJobs)
router.get("/gov", govJobs)
router.post("/addlist",addJoblist)
router.post("/passion",limiter(3),passionJobs)
router.post("/qualify",limiter(3),qualifyJobs)
router.get("/more",limiter(1),moreJob)


export default router;