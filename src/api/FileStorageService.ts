import axios,
{
  AxiosRequestConfig,
} from "axios";
import Util from "../util/Util";
import AuthService from "./AuthService";
import {
  FileData,
  FileDeleteResponse,
  FileDownloadRequest,
  FileUploadRequest,
} from "./type/type";

const API_URL = process.env.REACT_APP_API_URL;

const getConfig = (): AxiosRequestConfig => {
  return {
    headers: {
      Authorization: AuthService.getTokenAuthorization(),
    }
  }
};

export default class FileStorageService {

  static async getList(): Promise<FileData[]> {
    const response = await axios.get<FileData[]>(`${API_URL}/storage`);
    return response.data;
  }

  static async download({id, key}: FileDownloadRequest): Promise<void> {
    const response = await axios.get(`${API_URL}/storage/download/id/${id}/key/${key}`, {
      ...getConfig(),
      responseType: 'blob'
    });
    const filename = Util.getFilenameFromContentDisposition(
      response.headers["content-disposition"]
    );
    Util.fileAutoDownload({
      data: response.data,
      filename: decodeURIComponent(filename)
    });
  }

  static async delete(id: number): Promise<FileDeleteResponse> {
    const response = await axios.delete<FileDeleteResponse>(`${API_URL}/storage/delete/${id}`, {
      ...getConfig()
    });
    return response.data;
  }

  static async upload({ key, file_list }: FileUploadRequest): Promise<FileData[]> {
    const data = new FormData();
    data.append("key", key);
    file_list.map(file => 
      data.append("files", file)
    );

    const response = await axios.post<FileData[]>(`${API_URL}/storage/upload`, data, {
      ...getConfig()
    });
    return response.data;
  }

}