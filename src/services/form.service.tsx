import SpService from '@/services/sharepoint.service';
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
  // 上传文件接口
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
  getFileItems() {
    let token: string = this._getToken();
    return this._spService
      .getFileItems(this._fileListName, token)
      .then((res) => {
        let results = res.results;
        // 处理文件
        let files: any = [];
        results.forEach((element: any) => {
          files.push({
            id: element.ServerRelativeUrl,
            name: element.Name,
            status: 'done',
            url: process.env.host + element.ServerRelativeUrl,
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
}
