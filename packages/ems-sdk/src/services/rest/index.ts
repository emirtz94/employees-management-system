import axios, { AxiosInstance } from "axios";

export class RestService {
  protected axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });
  }
}
