import {
  IManagersListResponse,
  IPromoteToManagerPayload,
  IManagersListQueryParams,
  IPromoteToManagerResponse,
} from "../../types/managers";
import { RestService } from "../rest";

export interface IManagersService {
  getList(query: IManagersListQueryParams): Promise<IManagersListResponse>;
  create(payload: IPromoteToManagerPayload): Promise<IPromoteToManagerResponse>;
}

export class ManagersService extends RestService implements IManagersService {
  private resource = "managers";

  constructor(baseURL: string) {
    super(baseURL);
  }

  public async getList(
    query: IManagersListQueryParams
  ): Promise<IManagersListResponse> {
    const { pageNumber, pageSize, dept_no } = query;

    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (dept_no) params.append("dept_no", dept_no.toString());

    const { data } = await this.axios.get<IManagersListResponse>(
      `${this.resource}?${params.toString()}`
    );

    return data;
  }

  public async create(
    payload: IPromoteToManagerPayload
  ): Promise<IPromoteToManagerResponse> {
    const { data } = await this.axios.post<IPromoteToManagerResponse>(
      `${this.resource}`,
      payload
    );

    return data;
  }
}
