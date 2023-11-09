import express from 'express';
import { addAPost, deleteAPost, getAPost, getAllPost, getMypost, updateAPost } from '../controllers/PostControllers.js';
import { verifyToken } from '../middleware/middleware.js';


const router =express.Router()

router.post('/',verifyToken,addAPost)
router.get('/:id',getAPost)
router.get('/',getAllPost)
router.get('/:id',getMypost)
router.put('/:id',verifyToken,updateAPost)
router.delete('/:id',verifyToken,deleteAPost)
// router.get('/:id',deleteAPost)
// router.post('/login',LoginUser)

export default router