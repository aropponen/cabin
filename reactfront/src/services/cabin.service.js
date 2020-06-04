import http from "../http-common";

class CabinDataService {
    getAll() {
        return http.get("/cabin");
    }

    get(id) {
        return http.get(`/cabin/${id}`);
    }

    create(data) {
        return http.post("/cabin", data);
    }

    update(id, data) {
        return http.put(`/cabin/${id}`, data);
    }

    delete(id) {
        return http.delete(`/cabin/${id}`);
    }

    deleteAll() {
        return http.delete(`/cabin`);
    }
}

export default new CabinDataService();