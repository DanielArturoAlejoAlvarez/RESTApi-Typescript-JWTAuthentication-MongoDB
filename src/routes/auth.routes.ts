import { Router } from 'express'

const router: Router = Router()

import { signIn,signUp } from '../controllers/auth/auth.controller'

router.post('/signup', signUp)
router.post('/signin', signIn)


export default router