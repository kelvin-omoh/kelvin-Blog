import express from 'express';
import { LoginUser, RegisterUser } from '../controllers/UserContollers.js';


const router =express.Router()

router.post('/register',RegisterUser)
router.post('/login',LoginUser)

export default router