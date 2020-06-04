import http from "../http-common";

class ReservationDataService {
    getAll() {
        return http.get("/reservation");
    }

    get(id) {
        return http.get(`/reservation/${id}`);
    }
    getReservation(id) {
        return http.get(`/reservation/cabinowner/reservations/${id}`);
    }
    create(data) {
        return http.post("/reservation", data);
    }

    update(id, data) {
        return http.put(`/reservation/${id}`, data);
    }

    delete(id) {
        return http.delete(`/reservation/${id}`);
    }

    deleteAll() {
        return http.delete(`/reservation`);
    }
}

export default new ReservationDataService();