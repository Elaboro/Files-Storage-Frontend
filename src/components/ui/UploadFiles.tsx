import React,
{
  useState,
  FC,
  DragEvent,
} from "react";

interface IUploadFiles {
  onSelectedFile(file_list: File[]): void;
}

const UploadFiles: FC<IUploadFiles> = ({
  onSelectedFile,
}) => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);

    setDrag(false);

    onSelectedFile(files);
  };

  return (<>
    {drag
      ? <div
        style={{
          width: "100%",
          height: "100px",
          border: "2px dashed #87a9d7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1a202ccc",
          fontWeight: "bold",
          borderRadius: "0.375rem",
          fontSize: "20px",
        }}
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragStartHandler(e)}
        onDrop={e => onDropHandler(e)}
      >Отпустите файлы, что бы загрузить их</div>
      : <div
        style={{
          width: "100%",
          height: "100px",
          border: "2px dashed #87a9d7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1a202ccc",
          fontWeight: "bold",
          borderRadius: "0.375rem",
          fontSize: "20px",
        }}
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragStartHandler(e)}
      >Перетащите файлы для загрузки</div>
    }
  </>);
};

export default UploadFiles;