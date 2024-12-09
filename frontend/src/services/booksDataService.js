import axios from "axios";

//tk63@njit.edu          12/8/24             Tanvi Karad         IT302-451           Phase 5


class BookDataService {
    static url = "http://localhost:5050";

    getAll(page = 0) {
        return axios.get(
            `${BookDataService.url}/api/v1/tk63/books?page=${page}`
        );
    }
    get(id) {
        return axios.get(
            `${BookDataService.url}/api/v1/tk63/books?id=${id}`
        );
    }


    find(query, by = "title", page = 0) {
        console.log(`${BookDataService.url}/api/v1/tk63/books?${by}=${query}&page=${page}`);
        return axios.get(
            `${BookDataService.url}/api/v1/tk63/books?${by}=${query}&page=${page}`
        )
    }
 
     createComment(data) {
         console.log("create comment data", data)
         return axios.post(`${BookDataService.url}/api/v1/tk63/books/comment`, data)
         .then(response => {
            console.log('Comment created successfully:', response.data);
            return response.data; // Optionally return response data for further use
        })
        .catch(error => {
            console.error('Error creating comment:', error);
            throw error;  // Propagate the error to the caller
        });
     }
   

    updateComment(data) {
        console.log("update comment data", data)
        return axios.put(`${BookDataService.url}/api/v1/tk63/books/comment`, data)
        .then(response => {
           console.log('Comment updated successfully:', response.data);
           return response.data; // Optionally return response data for further use
       })
       .catch(error => {
           console.error('Error updating comment:', error);
           throw error;  // Propagate the error to the caller
       });
    }
    deleteComment(id, userId) {
        return axios.delete(
            `${BookDataService.url}/api/v1/tk63/books/comment`,
            { data: { review_id: id, user_id: userId } }
        )
    }
    getComment(data) {
        console.log("data in axios shit", data)
        return axios.get(`${BookDataService.url}/api/v1/tk63/books/comment/${data}`)
    }

    getPageCount() {
        console.log("calling getpagecount");
        const url = `${BookDataService.url}/api/v1/tk63/books`;
        console.log(url);
        return axios.get(`${BookDataService.url}/api/v1/tk63/books`)

    }

}
export default new BookDataService();