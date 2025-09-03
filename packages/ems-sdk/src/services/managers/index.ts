import {
  IManagersListResponse,
  IPromoteToManagerPayload,
  IManagersListQueryParams,
  IPromoteToManagerResponse,
} from "../../types/managers";
import { RestService } from "../rest";

export interface IManagersService {
  getList(query: IManagersListQueryParams): Promise<IManagersListResponse>;
}

export class ManagersService extends RestService implements IManagersService {
  private resource = "managers";

  constructor(baseURL: string) {
    super(baseURL);
  }

  public async getList(
    query: IManagersListQueryParams
  ): Promise<IManagersListResponse> {
    const { pageNumber, pageSize } = query;

    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    const { data } = await this.axios.get<IManagersListResponse>(
      `${this.resource}?${params.toString()}`
    );

    return data;
  }

  public async promoteEmployeeToManager(
    payload: IPromoteToManagerPayload
  ): Promise<IPromoteToManagerResponse> {
    const { data } = await this.axios.post<IPromoteToManagerResponse>(
      `${this.resource}`,
      payload
    );

    return data;
  }
}
