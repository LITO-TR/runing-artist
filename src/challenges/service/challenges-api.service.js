import http from "../../core/services/http-common";

export class ChallengesApiService {
  getAll() {
    return http.get("/challenges");
  }
  getById(id) {
    return http.get(`/challenges/${id}`);
  }
  create(data) {
    return http.post("/challenges/", data);
  }
  update(id, data) {
    return http.put(`/challenges/${id}`, data);
  }
  delete(id) {
    return http.delete(`/challenges/${id}`);
  }
}
