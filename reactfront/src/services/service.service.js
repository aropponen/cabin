import http from "../http-common";

class ServiceDataService {
    getAll() {
        return http.get("/service");
    }

    get(id) {
        return http.get(`/service/${id}`);
    }

    create(data) {
        return http.post("/service", data);
    }

    update(id, data) {
        return http.put(`/service/${id}`, data);
    }

    delete(id) {
        return http.delete(`/service/${id}`);
    }

    deleteAll() {
        return http.delete(`/service`);
    }
}

export default new ServiceDataService();