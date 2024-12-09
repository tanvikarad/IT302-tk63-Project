//tk63@njit.edu          12/8/24             Tanvi Karad         IT302-451           Phase 5

import express from 'express'
import BooksController from './books.controller.js'
import commentsController from './comments.controller.js'


const router = express.Router()
router.route('/').get(BooksController.apiGetBooks)

router.route("/comment/:id").get(commentsController.apiGetComment)
router.route("/comment/").post(commentsController.apiPostComment)
router.route("/comment/").put(commentsController.apiUpdateComment)
router.route("/comment/").delete(commentsController.apiDeleteComment)


 


export default router
