import React,
{
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import FileList from "../components/FileList";
import FileStorageService from "../api/FileStorageService";
import {
  FileData,
  FileDeleteResponse,
} from "../api/type/type";
import { FC } from "react";

const FilesStorage: FC<{
  file_data_list: FileData[],
  setFileDataList: Dispatch<SetStateAction<FileData[]>>;
}> = ({
  file_data_list,
  setFileDataList,
}) => {

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