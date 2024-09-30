import booksDAO from '../dao/booksDAO.js'

export default class BooksController {
  static async apiGetBooks(req,res,next) {
    const booksPerPage = req.query.booksPerPage? parseInt(req.query.booksPerPage) : 20
    const page = req.query.page ?   parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.rated){
      filters.rated = req.query.rated
    } else if(req.query.title){
      filters.title = req.query.title
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
    