import SpService from '@/services/sharepoint.service';
export default class FormService {
  private _spService: SpService;
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
    return this._spService
      .uploadFile(fileName, 'ProcAttachList', fileObject, token)
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
      .deleteFileItem('ProcAttachList', fileName, token)
      .catch((error: any) => {
        // this._logService.logError(error)
        console.error(error);
        return Promise.reject(error);
      });
  }
}
