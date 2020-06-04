import http from "../http-common";

class ResortDataService {
    getAll() {
        return http.get("/resort");
    }

    get(id) {
        return http.get(`/resort/${id}`);
    }

    getAllCabins(id) {
        return http.get(`/resort/cabins/${id}`);
    }

    create(data) {
        return http.post("/resort", data);
    }

    update(id, data) {
        return http.put(`/resort/${id}`, data);
    }

    delete(id) {
        return http.delete(`/resort/${id}`);
    }

    deleteAll() {
        return http.delete(`/resort`);
    }
}

export default new ResortDataService();