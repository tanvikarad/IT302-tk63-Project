import mongodb from "mongodb"
import CommentsController from "../api/comments.controller.js"
const ObjectId = mongodb.ObjectId

let comments
export default class CommentsDAO {
  static async injectDB(conn) {
    if(comments) {
      return
    } try {
      comments = await conn.db('IT302').collection(process.env.BOOOKS_NS)
      console.log("the try-catch works")
    } catch(e) {
      console.error(`unable to establish connection handle in commentsDAO: ${e}`)
    }
  }
//tk63@njit.edu          11/14/24             Tanvi Karad         IT302-451           Phase 4

  static async getComment(commentID){
      console.log("get comment");
      try {
          const commentDoc = await comments.findOne({ _id: commentID });
          console.log(commentDoc);
          return commentDoc;
      } catch(e) {
          console.error(`unable to get comment: ${e}`);
          console.error(e);
          return { error: e };
      }
  }
    

  static async addComment(bookID, user, comment, date) {
    console.log("add comment")
    try {
      const commentDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        comment: comment,
        book_id: bookID
      }
      console.log(commentDoc);
      return await comments.insertOne(commentDoc);
    } catch(e) {
      console.error(`unable to post review: ${e}`)
      console.error(e)
      return { error: e }
    }
  
  }
 
  static async updateComment(commentID, userId, comment, date) {
    try {
      const updateResponse = await comments.updateOne(
        { user_id: userId, _id: new ObjectId(commentID) },
        { $set: { comment: comment, date: date } }
      )
      console.log(userId)
      console.log(commentID)
      return updateResponse
    } catch(e) {
      console.error(`unable to update review: ${e}`)
      console.error(e)
      return { error: e}
    }
  }
  
  static async deleteComment(commentID, userId) {
    try {
      const deleteResponse = await comments.deleteOne({
        _id: new ObjectId(commentID),
        user_id: userId,
      })
      console.log(commentID)
      console.log(userId)

      return deleteResponse
    } catch(e) {
      console.error(`unable to delete the comment: ${e}`)
      console.error(e)
      return { error: e.message }
    }
  }
  
  
}
