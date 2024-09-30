import express from 'express'
import BooksController from './books.controller.js'


const router = express.Router()

router.route('/').get(BooksController.apiGetBooks)
export default router
