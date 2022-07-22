import SpService from '@/services/sharepoint.service';
import { IFilter } from '@/models/type';
import { StringGradients } from 'antd/lib/progress/progress';

interface FileForm {
  ProcName: string;
  ProcId: number;
  FieldName: string;
  FileUrl: string;
}
export default class FormService {
  private _spService: SpService;
  private _fileListName = 'ProcAttachList';
  private _folderName = '/sites/DPA_DEV_Community/LevelRequest/ProcAttachList';
  // private _logService;
  // private authService: AuthService;

  private _getToken(): any {
    return process.env.token;
  }
  constructor() {
    this._spService = new SpService();
  }
  // 上传单个文件接口
  async uploadFile(fileName: string, fileObject: any, id?: string) {
    let token = this._getToken();
    return this._spService
      .uploadFile(fileName, this._fileListName, fileObject, token)
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }

  // 删除一条数据
  removeItem(listName: string, id: string) {
    let token = this._getToken();
    return this._spService
      .removeItem(listName, id, token)
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  submitBizForm(
    listName: string,
    item: any,
    link: string,
    formLink: string,
    isSubmit: Boolean,
  ) {
    return this._spService
      .submitBizForm(listName, item, link, formLink, isSubmit)
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  updateItem(listName: string, id: number, item: any) {
    let token = this._getToken();
    return this._spService.updateItem(listName, id, item, token);
  }
  // 更新文件的属性
  /**
   *@param file 文件的信息 url，type
   *@param item 需要更新的属性
   **/
  updateFileItem(file: any, item: any) {
    let token = this._getToken();
    return this._spService
      .updateFileItem(file, item, token)
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  getTableDataAll(listName: string) {
    let token = this._getToken();
    return this._spService
      .getTableDataAll(listName, [], [], token)
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  deleteFileItem(fileName: string) {
    let token: string = this._getToken();
    return this._spService
      .deleteFileItem(this._fileListName, fileName, token)
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  getFile(url: string) {
    let token: string = this._getToken();
    return this._spService
      .getFile(url, token)
      .then((res) => {
        return res;
      })
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  getFileItems(ProcName: string, ProcId: number, fieldName?: string) {
    let token: string = this._getToken();
    let filePropertysList: any[] = [];
    let fields: any = [];
    return this.getFilesProperty(ProcName, ProcId, fieldName)
      .then((filePropertys) => {
        filePropertysList = filePropertys;
        let aryPromise: Promise<any>[] = [];

        filePropertys.forEach((element: FileForm) => {
          fields.push({
            filedName: element.FieldName,
            url: process.env.host + element.FileUrl,
            name: element.FileUrl.split('/').reverse()[0],
          });
          aryPromise.push(
            this.getFile(
              "https://serviceme.sharepoint.com/sites/DPA_DEV_Community/LevelRequest/_api/Web/GetFileByServerRelativePath(decodedurl='" +
                element.FileUrl +
                "')/ListItemAllFields",
            ),
          );
        });
        return Promise.all(aryPromise);
      })
      .then((res) => {
        let results = res;

        // 处理文件
        let files: any = [];
        results.forEach((element: any, index: number) => {
          files.push({
            id: element.id,
            type: element.type,
            etag: element.etag,
            fieldName: fields[index]['filedName'], //一个表单多个文件字段时
            name: fields[index]['name'],
            status: 'done',
            url: fields[index]['url'],
            // thumbUrl: './file.png',
          });
        });
        return files;
      })
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  getFilesProperty(proName: string, procId: number, fieldName?: string) {
    return this.getTableData(
      this._fileListName,
      [
        {
          type: 'filter eq',
          value: proName,
          properties: ['ProcName'],
        },
        {
          type: 'filter eq',
          value: procId,
          properties: ['ProcId'],
        },
      ],
      [],
    );
    // return this.getTableDataAll(this._fileListName)
  }
  getTableData(listName: string, filter: IFilter[], expand: any[]) {
    return this._spService
      .getTableData(listName, filter, expand)
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  getUserList() {
    return this._spService.getUserList().catch((error: any) => {
      // this._logService.logError(error)
      console.error(error);
      return Promise.reject(error);
    });
  }
  getUserById(id: string | number) {
    return this._spService.getUserById(id).catch((error: any) => {
      // this._logService.logError(error)
      console.error(error);
      return Promise.reject(error);
    });
  }
}
