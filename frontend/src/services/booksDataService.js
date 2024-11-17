import axios from "axios";

//tk63@njit.edu          11/14/24             Tanvi Karad         IT302-451           Phase 4


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
        return axios.post(`${BookDataService.url}/api/v1/tk63/books/comment`, data)
    }

    updateRComment(data) {
        return axios.put(`${BookDataService.url}/api/v1/tk63/books/comment`, data)
    }
    deleteComment(id, userId) {
        return axios.delete(
            `${BookDataService.url}/api/v1/tk63/books/comment`,
            { data: { review_id: id, user_id: userId } }
        )
    }
    getComment(data) {
        return axios.get(`${BookDataService.url}/api/v1/tk63/books/comment`, data)
    }

    getPageCount() {
        console.log("calling getpagecount");
        const url = `${BookDataService.url}/api/v1/tk63/books`;
        console.log(url);
        return axios.get(`${BookDataService.url}/api/v1/tk63/books`)

    }

}
export default new BookDataService();