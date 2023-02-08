
interface FileAutoDownloadData {
  data: Blob;
  filename: string;
}

export default class Util {
  static fileAutoDownload({data, filename}: FileAutoDownloadData) {
    const url = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = url
    link.download = filename;
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  }

  static getFilenameFromContentDisposition(content_disposition: string) {
    let filename = "";
    const regexp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = regexp.exec(content_disposition);
    if (matches != null && matches[1]) { 
      filename = matches[1].replace(/['"]/g, '');
    }
    return filename;
  }
}