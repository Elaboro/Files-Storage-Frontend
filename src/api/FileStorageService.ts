import axios from "axios";
import { FileData } from "./type/type";

const API_URL = process.env.REACT_APP_API_URL;

export default class FileStorageService {

  static async getList(): Promise<FileData[]> {
    const response = await axios.get<FileData[]>(`${API_URL}/storage`);
    return response.data;
  }

}