import CommentsDAO from '../dao/commentsDAO.js'
//tk63@njit.edu          12/8/24             Tanvi Karad         IT302-451           Phase 5

export default class CommentsController {

  static async apiPostComment(req,res,next) {
    try {
      const bookId = req.body.id
      const comment = req.body.comment
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }

      const date = new Date()

      const CommentResponse = await CommentsDAO.addComment(
        bookId,
        userInfo,
        comment,
        date
      )
    res.json(CommentResponse)
    } catch(e) {
    res.status(500).json({ error: e.message })
    }
  }

  static async apiGetComment(req, res) {
      try {
          const bookID = req.params.id;
          const comments = await CommentsDAO.getComment(bookID);
          res.json(comments);
      } catch (e) {
          res.status(500).json({ error: e.message });
      }
  }
  

  static async apiUpdateComment(req,res,next) {
    try {
      const commentID = req.body.commentId
      const comment = req.body.comment
      const date = new Date()
      const CommentResponse = await CommentsDAO.updateComment(
        commentID,
        req.body.user_id,
        comment,
        date
      )
  
      var { error } = CommentResponse
      if(error) {
        res.status.json({error})
      }
      if(CommentResponse.modifiedCount === 0) {
        throw new Error ("unable to update the comment. User may not be original poster")
      }
      res.json(CommentResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }

  static async apiDeleteComment(req,res,next) {
    try {
      const commentID = req.body.commentID
      const userId = req.body.user_id
      const CommentResponse = await CommentsDAO.deleteComment(
        commentID,
        userId,
      )
      res.json(CommentResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }
  
  

}
