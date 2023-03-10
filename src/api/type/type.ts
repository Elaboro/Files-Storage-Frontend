
export interface FileData {
  id: number;
  filename: string;
  username: string;
}

export interface FileDeleteResponse {
  id: number;
  filename: string;
}

export interface FileDownloadRequest {
  id: number;
  key: string;
}

export interface FileUploadRequest {
  key: string;
  file_list: File[];
}