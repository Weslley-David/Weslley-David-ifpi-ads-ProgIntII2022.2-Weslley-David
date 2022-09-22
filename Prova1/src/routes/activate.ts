import { Router } from 'express'
import { ActivateContoller } from '../controllers/ActivateController'
import { AuthMiddleware } from '../middlewares/auth'
var activate = new ActivateContoller
const activateRoutes = Router()

activateRoutes.get('/email', activate.email)

activateRoutes.get('/phone', AuthMiddleware, activate.phone)

export default activateRoutes