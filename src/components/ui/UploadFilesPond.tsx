import React, { FC } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { FilePondFile } from "filepond";

interface UploadFilesPondProps {
  onSelectedFile(file_list: File[]): void;
};

const UploadFilesPond: FC<UploadFilesPondProps> = ({
  onSelectedFile
}) => {
  const onUpdateFiles = (filepond_list: FilePondFile[]) => {
    const file_list = filepond_list.map(pond => pond.file as File);
    onSelectedFile(file_list);
  }

  return <FilePond
    onupdatefiles={onUpdateFiles}
    allowMultiple={true}
    credits={false}
    labelIdle={`
      Перетащите файлы в эту область и отпустите для загрузки <br>
      <span class="filepond--label-action">
        (Нажмите здесь, что бы выбрать файлы)
      </span>
    `}
  />
}

export default UploadFilesPond;