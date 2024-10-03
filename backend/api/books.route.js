//tk63@njit.edu          10/3/24             Tanvi Karad         IT302-451           Phase 2

import express from 'express'
import BooksController from './books.controller.js'


const router = express.Router()

router.route('/').get(BooksController.apiGetBooks)
export default router
