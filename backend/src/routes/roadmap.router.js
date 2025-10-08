import express from 'express';
import { addRoadmap, createRoadmapPdf, downloadRoadmapPdf, getRoadmap, roadmap } from '../controllers/roadmap.controller.js';
import { limiter } from '../middleware/expressRateLimit.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router()


router.post("/",limiter(2),roadmap)
//to extract roadmap from database to show the user
router.get("/",isLoggedIn,getRoadmap)
router.post("/add",isLoggedIn,limiter(1),addRoadmap)
router.post("/download",isLoggedIn,limiter(1),createRoadmapPdf)
router.get("/download/:file",downloadRoadmapPdf)


export default router;