import express from 'express';
import { addJoblist, govJobs, moreJob, passionJobs, privateJobs, qualifyJobs,} from '../controllers/job.controller.js';
import { limiter } from '../middleware/expressRateLimit.js';
import {isLoggedIn} from '../middleware/auth.middleware.js'

const router = express.Router()


router.get("/private",isLoggedIn,privateJobs)
router.get("/gov",isLoggedIn, govJobs)
router.post("/addlist",isLoggedIn,addJoblist)
router.post("/passion",isLoggedIn,limiter(3),passionJobs)
router.post("/qualify",isLoggedIn,limiter(3),qualifyJobs)
router.get("/more",isLoggedIn,limiter(1),moreJob)


export default router;