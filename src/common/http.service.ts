import axios from 'axios';

type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

interface IObject {
  [key: string]: any;
}

interface IRequestConfiguration {
  data?: IObject | string;
  params?: IObject;
  headers?: IObject;
  responseType?: ResponseType;
}

export default class HttpService {
  public requestType: string = '';
  public requestUrl: string = '';
  public requestConfiguration: IRequestConfiguration = {};
  private _http: any;

  constructor() {
    this._http = axios.create();
    this._http.interceptors.request.use((config: any) => {
      this.requestConfiguration &&
        this.requestConfiguration.headers &&
        this.requestConfiguration.headers.Authorization &&
        (() => {
          for (let item in this.requestConfiguration.headers) {
            config.headers[item] = this.requestConfiguration.headers[item];
          }
        })();
      return config;
    });
  }

  get(requestUrl: string, requestConfig?: IRequestConfiguration) {
    // this.requestType = 'GET'
    // this.requestUrl = requestUrl
    // this.requestConfiguration = requestConfig ? requestConfig : {}
    // return this._http.get(this.requestUrl, this.requestConfiguration)
    if (process.env.type == 'test') {
      delete requestConfig?.headers?.Authorization;
    }
    return axios({
      method: 'get',
      url: requestUrl,
      params: requestConfig?.params,
      headers: requestConfig?.headers,
      responseType: requestConfig?.responseType,
    });
  }

  post(requestUrl: string, requestConfig?: IRequestConfiguration) {
    // this.requestType = 'POST'
    // this.requestUrl = requestUrl
    // this.requestConfiguration = requestConfig ? requestConfig : {}
    // return this._http.post(this.requestUrl, this.requestConfiguration.data, this.requestConfiguration.headers)
    if (process.env.type == 'test') {
      delete requestConfig?.headers?.Authorization;
    }
    return axios({
      method: 'post',
      url: requestUrl,
      data: requestConfig?.data,
      params: requestConfig?.params,
      headers: requestConfig?.headers,
    });
  }

  patch(requestUrl: string, requestConfig?: IRequestConfiguration) {
    // this.requestType = 'POST'
    // this.requestUrl = requestUrl
    // this.requestConfiguration = requestConfig ? requestConfig : {}
    // return this._http.post(this.requestUrl, this.requestConfiguration.data, this.requestConfiguration.headers)
    if (process.env.type == 'test') {
      delete requestConfig?.headers?.Authorization;
    }
    return axios({
      method: 'patch',
      url: requestUrl,
      data: requestConfig?.data,
      params: requestConfig?.params,
      headers: requestConfig?.headers,
    });
  }
  delete(requestUrl: string, requestConfig?: IRequestConfiguration) {
    // this.requestType = 'POST'
    // this.requestUrl = requestUrl
    // this.requestConfiguration = requestConfig ? requestConfig : {}
    // return this._http.post(this.requestUrl, this.requestConfiguration.data, this.requestConfiguration.headers)
    if (process.env.type == 'test') {
      delete requestConfig?.headers?.Authorization;
    }
    return axios({
      method: 'delete',
      url: requestUrl,
      data: requestConfig?.data,
      params: requestConfig?.params,
      headers: requestConfig?.headers,
    });
  }
}
