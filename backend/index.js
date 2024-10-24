//tk63@njit.edu          10/3/24             Tanvi Karad         IT302-451           Phase 2

import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import booksDAO from './dao/booksDAO.js'
import CommentsDAO from './dao/commentsDAO.js'

async function main() {

  dotenv.config()

  const client = new mongodb.MongoClient( process.env.BOOKSS_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    await booksDAO.injectDB(client)
    await CommentsDAO.injectDB(client)


    app.listen(port, () => {
        console.log('server is running on port:' + port);
        })
    
      } catch (e) {
        console.error(e);
        process.exit(1)
      }
    }
    main().catch(console.error);
    