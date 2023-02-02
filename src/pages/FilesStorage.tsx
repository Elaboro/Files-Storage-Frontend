import React,
{
  useEffect,
  useState,
} from "react";
import FileList from "../components/FileList";
import FileStorageService from "../api/FileStorageService";
import { FileData } from "../api/type/type";

const FilesStorage = () => {

  const [file_data, setFileDataList] = useState<FileData[]>([]);

  useEffect(() => {
      fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const file_data = await FileStorageService.getList();
    setFileDataList(file_data);
  };

  return(
    <div>
      <FileList file_data={file_data} />
    </div>
  );
};

export default FilesStorage;