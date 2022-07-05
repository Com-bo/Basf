import SpService from '@/services/sharepoint.service';
import { IFilter } from '@/models/type';
import useItems from 'antd/lib/menu/hooks/useItems';
interface FileForm {
  ProcName: string;
  ProcId: number;
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
    let index = fileName.lastIndexOf('.');
    let newFileName =
      fileName.substring(0, index) +
      new Date().getTime() +
      fileName.substring(index);
    return this._spService
      .uploadFile(newFileName, this._fileListName, fileObject, token)
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
  submitBizForm(listName: string, item: any, link: string, isSubmit: Boolean) {
    return this._spService
      .submitBizForm(listName, item, link, isSubmit)
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
  getFileItems(ProcName: string, ProcId: number) {
    let token: string = this._getToken();
    let listIndex: number[] = [];
    return this.getFilesProperty()
      .then((filePropertys) => {
        filePropertys.forEach((element: FileForm, index: number) => {
          if (element.ProcId == ProcId) {
            listIndex.push(index);
          }
        });
        return this._spService.getFileItems(this._fileListName, token);
      })
      .then((res) => {
        let results = res.results;
        // 处理文件
        let files: any = [];
        results.forEach((element: any, index: number) => {
          if (listIndex.indexOf(index) != -1) {
            files.push({
              id: element.ServerRelativeUrl,
              name: element.Name,
              status: 'done',
              url: process.env.host + element.ServerRelativeUrl,
            });
          }
        });
        return files;
      })
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
  getFilesProperty() {
    return this.getTableDataAll(this._fileListName);
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
}
