import React, { FC } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { FileData } from "../api/type/type";
import FileItem from './FileItem';

const FileList: FC<{ file_data: FileData[] }> = ({
  file_data
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
          />
        )}

      </SimpleGrid>
    </div>
  );
};

export default FileList;