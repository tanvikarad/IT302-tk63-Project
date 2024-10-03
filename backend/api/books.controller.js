//tk63@njit.edu          10/3/24             Tanvi Karad         IT302-451           Phase 2

import booksDAO from '../dao/booksDAO.js'

export default class BooksController {
  static async apiGetBooks(req,res,next) {
    const booksPerPage = req.query.booksPerPage? parseInt(req.query.booksPerPage) : 20
    const page = req.query.page ?   parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.id){
      filters.id = req.query.id
    } else if(req.query.title){
      filters.title = req.query.title
    } else if(req.query.pageCount){
      filters.pageCount = req.query.pageCount
    }
    const { books_list, totalNumBooks } = await booksDAO.getBooks({
        filters, page, booksPerPage})
    
        let response = {
          books: books_list,
          page: page,
          filters: filters,
          entries_per_page: booksPerPage,
          total_results: totalNumBooks,
        }
        res.json(response)
       }
    }
    