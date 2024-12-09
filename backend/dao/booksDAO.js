//tk63@njit.edu          12/8/24             Tanvi Karad         IT302-451           Phase 5

let books_tk63

export default class BooksDAO {
  static async injectDB(conn) {
    if(books_tk63){ 
      return
    } try {
      books_tk63 = await conn.db(process.env.BOOKS_NS).collection('books_tk63')
    } catch(e) {
      console.error(`unable to connect in BooksDAO: ${e}`)

    }
  }
  static async getBooks({
    filters = null,
    page = 0,
    booksPerPage = 20,
  } = {}) {
    let query
      if(filters) {
        console.log(filters)
        if("title" in filters) {
          console.log(filters["title"])
          console.log("in title")
          query = { $text: { $search: filters['title']}}
        } else if("id" in filters) {
          console.log(filters["id"])
          console.log("id works")
          query = { "id": { $eq: (parseInt(filters['id']))}}
        }else if("pageCount" in filters) {
          console.log(filters["pageCount"])
          console.log("pg works")
            query = { "pageCount": { $eq: (parseInt(filters['pageCount']))}}
      }  
 let cursor
 try {
   cursor = await books_tk63
     .find(query)
     .limit(booksPerPage)
     .skip(booksPerPage * page)
   const books_list = await cursor.toArray()
   const totalNumBooks = await books_tk63.countDocuments(query)
   return {books_list, totalNumBooks}
 } catch(e) {
   console.error(`Unable to issue find command, ${e}`)
   console.error(e)
   return { books_list: [], totalNumBooks: 0 }
 }
}
}}
