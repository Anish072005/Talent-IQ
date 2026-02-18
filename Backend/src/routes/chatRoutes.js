import express, { Router } from 'express';
import { getStreamToken } from '../controllers/chatController.js';
import {protectRoute} from '../middleware/protectRoute.js';
const routes=express.Router()
routes.get("/token",protectRoute,getStreamToken)
export default routes;