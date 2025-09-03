import {
  IDepartmentGetByIdResponse,
  IDepartmentListResponse,
  IDepartmentsListQueryParams,
  IDepartmentCreatePayload,
  IDepartmentCreateResponse,
  IDepartmentUpdatePayload,
  IDepartmentUpdateResponse,
} from "../../types/departments";
import { RestService } from "../rest";

export interface IDepartmentsService {
  getList(query: IDepartmentsListQueryParams): Promise<IDepartmentListResponse>;
  getById(id: number): Promise<IDepartmentGetByIdResponse>;
  create(payload: IDepartmentCreatePayload): Promise<IDepartmentCreateResponse>;
  update(
    id: number,
    payload: IDepartmentUpdatePayload
  ): Promise<IDepartmentUpdateResponse>;
}

export class DepartmentsService
  extends RestService
  implements IDepartmentsService
{
  private resource = "departments";

  constructor(baseURL: string) {
    super(baseURL);
  }

  public async getList(
    query: IDepartmentsListQueryParams
  ): Promise<IDepartmentListResponse> {
    const { pageNumber, pageSize, orderBy, sort } = query;

    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (orderBy) params.append("orderBy", orderBy);
    if (sort) params.append("sort", sort);

    const { data } = await this.axios.get<IDepartmentListResponse>(
      `${this.resource}?${params.toString()}`
    );

    return data;
  }

  public async getById(id: number): Promise<IDepartmentGetByIdResponse> {
    const { data } = await this.axios.get<IDepartmentGetByIdResponse>(
      `${this.resource}/${id}`
    );
    return data;
  }

  public async create(
    payload: IDepartmentCreatePayload
  ): Promise<IDepartmentCreateResponse> {
    const { data } = await this.axios.post<IDepartmentCreateResponse>(
      `${this.resource}`,
      payload
    );
    return data;
  }

  public async update(
    id: number,
    payload: IDepartmentUpdatePayload
  ): Promise<IDepartmentUpdateResponse> {
    const { data } = await this.axios.put<IDepartmentUpdateResponse>(
      `${this.resource}/${id}`,
      payload
    );
    return data;
  }
}
