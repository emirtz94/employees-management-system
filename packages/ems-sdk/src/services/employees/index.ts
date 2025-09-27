import {
  IEmployeeCreatePayload,
  IEmployeeCreateResponse,
  IEmployeeGetByIdResponse,
  IEmployeeListQueryParams,
  IEmployeeListResponse,
  IEmployeeUpdatePayload,
} from "../../types/employees";
import { RestService } from "../rest";
import { IEmployeeUpdateResponse } from "../../types/employees/response";

export interface IEmployeesService {
  getList(query: IEmployeeListQueryParams): Promise<IEmployeeListResponse>;
  getById(id: number): Promise<IEmployeeGetByIdResponse>;
  create(payload: IEmployeeCreatePayload): Promise<IEmployeeCreateResponse>;
  update(
    id: number,
    payload: IEmployeeUpdatePayload
  ): Promise<IEmployeeUpdateResponse>;
  delete(id: number): Promise<{ message: string }>;
}

export class EmployeesService extends RestService implements IEmployeesService {
  private resource = "employees";

  constructor(baseURL: string) {
    super(baseURL);
  }

  public async getList(
    query: IEmployeeListQueryParams
  ): Promise<IEmployeeListResponse> {
    const { pageNumber, pageSize, orderBy, sort, dept_no, search } = query;

    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (orderBy) params.append("orderBy", orderBy);
    if (sort) params.append("sort", sort);
    if (dept_no) params.append("dept_no", dept_no.toString());
    if (search) params.append("search", search);

    const { data } = await this.axios.get<IEmployeeListResponse>(
      `${this.resource}?${params.toString()}`
    );
    return data;
  }

  public async getById(id: number): Promise<IEmployeeGetByIdResponse> {
    const { data } = await this.axios.get<IEmployeeGetByIdResponse>(
      `${this.resource}/${id}`
    );
    return data;
  }

  public async create(
    payload: IEmployeeCreatePayload
  ): Promise<IEmployeeCreateResponse> {
    const { data } = await this.axios.post<IEmployeeCreateResponse>(
      `${this.resource}`,
      payload
    );
    return data;
  }

  public async update(
    id: number,
    payload: IEmployeeUpdatePayload
  ): Promise<IEmployeeUpdateResponse> {
    const { data } = await this.axios.put<IEmployeeUpdateResponse>(
      `${this.resource}/${id}`,
      payload
    );
    return data;
  }

  public async delete(id: number): Promise<{ message: string }> {
    const { data } = await this.axios.delete<{ message: string }>(
      `${this.resource}/${id}`
    );
    return data;
  }
}
