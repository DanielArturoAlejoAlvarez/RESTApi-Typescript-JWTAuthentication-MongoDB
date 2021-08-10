import { Router } from 'express'

const router: Router = Router()

import { profile, signIn,signUp } from '../controllers/auth/auth.controller'
import { isAuth } from '../middlewares/verifyToken'

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/profile', isAuth, profile)


export default router