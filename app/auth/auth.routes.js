import {authUser}  from './auth.controller.js'
import express from 'express';

const router = express.Router()

router.route('/login').post(authUser)

export default router