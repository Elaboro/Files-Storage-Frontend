import React,
{
  FC,
} from "react";
import { SimpleGrid } from "@chakra-ui/react";
import {
  FileData,
  FileDeleteResponse,
} from "../api/type/type";
import FileItem from './FileItem';

interface FileListProps {
  file_data: FileData[];
  onDeleteFile: (file_data: FileDeleteResponse) => void;
};

const FileList: FC<FileListProps> = ({
  file_data,
  onDeleteFile,
}) => {
  return (
    <div>
      <SimpleGrid
        spacing={4}
        templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
        borderWidth={1}
        borderRadius={12}
        padding={3}
      >

        {file_data.map((file_data: FileData) =>
          <FileItem
            file_data={file_data}
            key={file_data.id}
            onDeleteFile={onDeleteFile}
          />
        )}

      </SimpleGrid>
    </div>
  );
};

export default FileList;