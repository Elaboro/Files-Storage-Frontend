import React,
{
  useEffect,
  useState,
} from "react";
import FileList from "../components/FileList";
import FileStorageService from "../api/FileStorageService";
import {
  FileData,
  FileDeleteResponse,
} from "../api/type/type";

const FilesStorage = () => {

  const [file_data_list, setFileDataList] = useState<FileData[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const file_data = await FileStorageService.getList();
    setFileDataList(file_data);
  };

  const onDeleteFile = (file_data_deleted: FileDeleteResponse) => {
    setFileDataList(file_data_list.filter(
      file => file.id !== file_data_deleted.id
    ));
  };

  return (
    <div>
      <FileList
        file_data={file_data_list}
        onDeleteFile={onDeleteFile}
      />
    </div>
  );
};

export default FilesStorage;