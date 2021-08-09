import { Router } from 'express'

const router: Router = Router()

import { signIn,signUp,profile } from '../controllers/auth/auth.controller'

router.post('/signup', signUp)
router.post('/signin', signIn)

router.post('/profile', profile)

export default router