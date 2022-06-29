import HttpService from '@/common/http.service';
import { IFilter } from '@/models/type';
import {
  formatColumn,
  formatColumnByKey,
  formatExpandKey,
  formatKey,
  formatTable,
  getImageColumn,
} from './table-map';

export default class TaskService {
  private _http: HttpService;
  private formDigestValue: string;
  private pageSize = 500;

  private config = {
    Type: 'SPList',
  };

  constructor() {
    this._http = new HttpService();
    let test: any = window['_spPageContextInfo' as any];
    this.formDigestValue = test
      ? test.formDigestValue
        ? test.formDigestValue
        : ''
      : '';
  }

  private formatValue(e: any, listName: string, isFull = false) {
    let newOb: any = {};
    Object.keys(e).forEach((k) => {
      let column = formatColumn(this.config.Type, listName, k);
      if (column) {
        if (column.Type === 'Image') {
          newOb[`${column.Key}Url`] = e[column[this.config.Type]]
            ? (process.env.host ?? '') +
              process.env.taskRelativePath +
              e[column[this.config.Type]]
            : null;

          newOb[k] = e[k];
        } else if (column.Type === 'User') {
          let fields = formatExpandKey('User');
          newOb[column.Key] = e[k]
            ? !isFull
              ? e[k][fields[0][this.config.Type]]
              : Object.keys(e[k]).reduce((pre: any, cut: any) => {
                  let col = fields.find(
                    (e: { [x: string]: any }) => e[this.config.Type] === cut,
                  );
                  if (col) {
                    pre[col.Key] = e[k][cut];
                  } else {
                    console.log(cut);
                  }
                  return pre;
                }, {})
            : null;
        } else if (column.mapValue) {
          newOb[column.Key] = e[k]
            ? column.mapValue.find(
                (e1: { [x: string]: any }) => e1[this.config.Type] === e[k],
              )?.Key
            : null;
        } else {
          newOb[column.Key] = e[k];
        }
      }
    });
    newOb['key'] = e[formatKey(this.config.Type, listName)];
    newOb['Created'] = e['Created'];
    return newOb;
  }

  private formatTable(listName: string) {
    let table = formatTable(listName);
    console.log(table);
    console.log(listName);
    return {
      name: table[this.config.Type],
      expand: table.UserExpand,
    };
  }

  private formatFilter(filters: IFilter[], listName: string) {
    if (filters.length > 0) {
      let test =
        '&' +
        filters
          .map((e) => {
            let newStr = e.format;
            e.properties.forEach((k) => {
              let column = formatColumnByKey(listName, k);
              if (column.expandProperties) {
                newStr = newStr?.replace(
                  k,
                  `${k}/${column.expandProperties[this.config.Type][0]}`,
                );
              } else {
                newStr = newStr?.replace(k, `${column[this.config.Type]}`);
              }
            });
            return newStr;
          })
          .join('&');
      return test;
    }
    return '';
  }

  private formatFilterNew(filters: IFilter[], listName: string) {
    if (filters.length > 0) {
      let otherArr: string[] = [];
      let filterArr: string[] = [];
      filters.forEach((e) => {
        let type: any = e.type?.split(' ');
        // console.log('type', type, e.properties)
        if (type[0] === 'orderby') {
          otherArr.push(
            this.formatConditionOrderBy(listName, type, e.properties),
          );
        } else {
          filterArr.push(
            this.formatConditionFilter(listName, type, e.properties, e.value),
          );
        }
      });

      let newArr = filterArr.filter((e) => !!e);
      let test = '';
      if (newArr.length > 1) {
        let startStr = '';
        let midStr = '';
        for (let i = 0; i < newArr.length; i++) {
          const ele = newArr[i];
          midStr += ele;
          if (i > 0) {
            midStr += '</And>';
            startStr += '<And>';
          }
        }

        test = startStr + midStr;
      }
      return (
        (newArr.length > 1
          ? `<Query><Where>${test}</Where>${otherArr.join('')}`
          : `<Query><Where>${newArr[0]}</Where>${otherArr.join('')}`) +
        `</Query>`
      );
    }
    return '';
  }

  formatConditionOrderBy(
    listName: string | number,
    arr: any[],
    properties: any[],
  ) {
    let order = arr[1] ? arr[1] : 'asc';
    let column = formatColumnByKey(listName, properties[0]);
    if (column.expandProperties) {
      return `<OrderBy><FieldRef Name="${
        column.expandProperties[this.config.Type][0]
      }" Ascending="${order === 'asc' ? 'TRUE' : 'FALSE'}" /></OrderBy>`;
    } else {
      return `<OrderBy><FieldRef Name="${
        column[this.config.Type]
      }" Ascending="${order === 'asc' ? 'TRUE' : 'FALSE'}" /></OrderBy>`;
    }
  }

  formatConditionFilter(
    listName: string | number,
    arr: any[],
    properties: any[],
    value: any,
  ) {
    let func: string = arr[1];
    let relation = arr[2] ? arr[2] : 'and';
    // let operateType = {
    //     'eq':'eq',
    //     'gt':'gt',
    //     'contains':'contains'
    // }
    let newArr = [];
    newArr = properties.map((k) => {
      let column = formatColumnByKey(listName, k);
      if (column.expandProperties) {
        if (func === 'contains') {
          return `<${this.titleCase(func)}><FieldRef Name='${
            column[this.config.Type]
          }'/><Value Type='${
            column.Type === 'Multiline Text' ? 'Note' : column.Type
          }'>${value}</Value></${this.titleCase(func)}>`;
        }
        return `<${this.titleCase(func)}><FieldRef Name="${
          column[this.config.Type]
        }" /><Value Type="${
          column.Type === 'Multiline Text' ? 'Note' : column.Type
        }">${value}</Value></${this.titleCase(func)}>`;
      } else {
        if (func === 'contains') {
          return `<${this.titleCase(func)}><FieldRef Name='${
            column[this.config.Type]
          }'/><Value Type='${
            column.Type === 'Multiline Text' ? 'Note' : column.Type
          }'>${value}</Value></${this.titleCase(func)}>`;
        }
        return `<${this.titleCase(func)}><FieldRef Name="${
          column[this.config.Type]
        }" /><Value Type="${
          column.Type === 'Multiline Text' ? 'Note' : column.Type
        }">${value}</Value></${this.titleCase(func)}>`;
      }
    });

    if (newArr.length > 1) {
      let startStr = '';
      let midStr = '';
      for (let i = 0; i < newArr.length; i++) {
        const ele = newArr[i];
        midStr += ele;
        if (i > 0) {
          midStr += `</${this.titleCase(relation)}>`;
          startStr += `<${this.titleCase(relation)}>`;
        }
      }

      let test = startStr + midStr;
      return test;
    }
    return newArr[0];
  }

  private titleCase(str: string) {
    let newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    return newStr;
  }

  private formatExpand(columns: string[], listName: string) {
    if (columns.length > 0) {
      let str0 = ',';
      str0 += columns
        .map((k) => {
          let column = formatColumnByKey(listName, k);
          return column.expandProperties[this.config.Type]
            .map((e: any) => `${k}/${e}`)
            .join(',');
        })
        .join(',');
      let str = '&$expand=';
      str += columns.join(',');
      return str0 + str;
    }
    return '';
  }

  private formatUploadData(
    item: any,
    table: { name?: any; expand: any },
    listName: string,
  ) {
    let newOb: any = {};
    Object.keys(item).forEach((k) => {
      let column = formatColumnByKey(listName, k);
      if (column) {
        if (column.mapValue) {
          newOb[k] = column.mapValue.find(
            (e: { [x: string]: any }) => e['Key'] === item[k],
          )?.[this.config.Type];
        } else if (column.imgColumn) {
          newOb[k] = item[k];
        } else {
          newOb[k] = item[k];
        }
      } else {
        newOb[k] = item[k];
      }
    });

    if (table.expand) {
      table.expand.forEach((k: string | number) => {
        if (newOb[k]) {
          newOb[`${k}Id`] = newOb[k];
          // newOb[`${k}@odata.bind`] = `systemusers(${newOb[`${k.toLowerCase()}`]})`
        }
        delete newOb[k];
      });
    }

    // if (newOb[`${'gender'}`]) {
    //     newOb[`${'gender'}`] = '993670000'
    // }

    delete newOb['icon'];
    // newOb = {
    //     "cr22e_ApprovalUsers@odata.bind": "/systemusers(5b60a15c-cf89-eb11-b1ac-0022485760be)",
    // }
    return newOb;
  }

  getHostUrl() {
    return process.env.host ?? '' + process.env.taskRelativePath;
  }

  getTableData(listName: string, filter: IFilter[], expand: any[], token: any) {
    let table = this.formatTable(listName);
    if (table.expand) {
      expand = expand.concat(table.expand).reduce((p: string[], c: string) => {
        if (p.findIndex((e) => e === c) < 0) {
          p.push(c);
        }
        return p;
      }, []);
    }

    if (filter[0] && !filter[0].format) {
      var queryPayload = {
        query: {
          // '__metadata': { 'type': 'SP.CamlQuery' },
          ViewXml:
            `<View>` +
            // + `<RowLimit>500@</RowLimit>`
            `${filter ? this.formatFilterNew(filter, listName) : ''}` +
            `</View>`,
          // "ListItemCollectionPosition": {
          //     "PagingInfo": "Paged=TRUE&p_ID=" + 1
          // }
        },
      };
      let url = `${process.env.host}${process.env.taskRelativePath}/_api/web/lists/getbytitle('${table.name}')/getitems`;

      return this._http
        .post(url, {
          headers: {
            Accept: 'application/json;odata=verbose',
            Authorization: `Bearer ${token}`,
            'X-RequestDigest': this.formDigestValue,
          },
          data: queryPayload,
        })
        .then((response: any) => {
          let res = response.data;
          return res.d.results.map((e: any) => this.formatValue(e, listName));
        });
    } else {
      let url =
        `${process.env.host}${process.env.taskRelativePath}/_api/web/lists/getbytitle('${table.name}')/items?` +
        `$skiptoken=Paged=TRUE&p_ID=1&$top=${this.pageSize}` +
        `&$select=*` +
        `${expand ? this.formatExpand(expand, listName) : ''}` +
        `${filter ? this.formatFilter(filter, listName) : ''}`;

      return this._http
        .get(url, {
          headers: {
            Accept: 'application/json;odata=verbose',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: any) => {
          let res = response.data;
          return res.d.results.map((e: any) => this.formatValue(e, listName));
        });
    }
  }

  getTableDataAll(
    listName: string,
    filter: IFilter[],
    expand: any[],
    token: any,
  ) {
    let table = this.formatTable(listName);
    if (table.expand) {
      expand = expand.concat(table.expand).reduce((p: string[], c: string) => {
        if (p.findIndex((e) => e === c) < 0) {
          p.push(c);
        }
        return p;
      }, []);
    }
    if (filter[0] && !filter[0].format) {
      var queryPayload = {
        query: {
          // '__metadata': { 'type': 'SP.CamlQuery' },
          ViewXml:
            `<View Scope='RecursiveAll'>` +
            `${filter ? this.formatFilterNew(filter, listName) : ''}` +
            `</View>`,
          // "ListItemCollectionPosition": {
          //     "PagingInfo": "Paged=TRUE&p_ID=" + 1
          // }
        },
      };
      let url = `${process.env.host}${process.env.taskRelativePath}/_api/web/lists/getbytitle('${table.name}')/getitems`;

      return this._http
        .post(url, {
          headers: {
            Accept: 'application/json;odata=verbose',
            Authorization: `Bearer ${token}`,
            'X-RequestDigest': this.formDigestValue,
          },
          data: queryPayload,
        })
        .then((response: any) => {
          let res = response.data;
          return res.d.results.map((e: any) => this.formatValue(e, listName));
        });
    } else {
      let url =
        `${process.env.host}${process.env.taskRelativePath}/_api/web/lists/getbytitle('${table.name}')/items?` +
        `$skiptoken=Paged=TRUE&p_ID=1&$top=${this.pageSize}` +
        `&$select=*` +
        `${expand ? this.formatExpand(expand, listName) : ''}` +
        `${filter ? this.formatFilter(filter, listName) : ''}`;

      return this._http
        .get(url, {
          headers: {
            Accept: 'application/json;odata=verbose',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response: any) => {
          let res = response.data;
          let next = res.d.__next;
          let list = res.d.results.map((e: any) =>
            this.formatValue(e, listName),
          );

          while (next) {
            let data = await this.getUrlNext(next, token).then((res: any) => {
              let next = res.d.__next;
              let list = res.d.results.map((e: any) =>
                this.formatValue(e, listName),
              );
              return { list, next };
            });
            // .catch((error: any) => {
            //     const { LogAction } = store.actions
            //     LogAction.logError(error)
            //     return Promise.reject(error);
            // })
            // console.log('data', data)
            list = list.concat(data.list);
            next = data.next;
          }
          return list;
        });
    }
  }

  getTableDataFilter(
    listName: string,
    filter: IFilter[],
    expand: any[],
    token: any,
  ) {
    let table = this.formatTable(listName);
    if (table.expand) {
      expand = expand.concat(table.expand).reduce((p: string[], c: string) => {
        if (p.findIndex((e) => e === c) < 0) {
          p.push(c);
        }
        return p;
      }, []);
    }
    var queryPayload = {
      query: {
        // '__metadata': { 'type': 'SP.CamlQuery' },
        ViewXml: `<View>${
          filter ? this.formatFilter(filter, listName) : ''
        }</View>`,
      },
    };
    let url = `${process.env.host}${process.env.taskRelativePath}/_api/web/lists/getbytitle('${table.name}')/getitems`;

    return this._http
      .post(url, {
        headers: {
          Accept: 'application/json;odata=verbose',
          Authorization: `Bearer ${token}`,
          'X-RequestDigest': this.formDigestValue,
        },
        data: queryPayload,
      })
      .then((response: any) => {
        let res = response.data;
        return res.d.results.map((e: any) => this.formatValue(e, listName));
      });
  }

  private getUrlNext(pageUrl: string, token: any) {
    return this._http
      .get(pageUrl, {
        headers: {
          Accept: 'application/json;odata=verbose',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        return response.data;
      });
  }

  addItem(listName: string, item: any, token: any) {
    let table = this.formatTable(listName);
    let newOb = this.formatUploadData(item, table, listName);
    let url = `${process.env.host}${
      process.env.taskRelativePath
    }/_api/web/lists/getbytitle('${this.formatTable(listName).name}')/items`;
    return this._http
      .post(url, {
        headers: {
          Accept: 'application/json;odata=verbose',
          Authorization: `Bearer ${token}`,
          'X-RequestDigest': this.formDigestValue,
        },
        data: newOb,
      })
      .then((response: any) => {
        let value = response.data.d;
        value['key'] = value[formatKey(this.config.Type, listName)];
        return value;
      });
  }

  updateItem(listName: string, id: number, item: any, token: any) {
    let table = this.formatTable(listName);
    let newOb = this.formatUploadData(item, table, listName);
    newOb['__metadata'] = { type: `SP.Data.${listName}ListItem` };

    let url = `${process.env.host}${
      process.env.taskRelativePath
    }/_api/web/lists/getbytitle('${
      this.formatTable(listName).name
    }')/items(${id})`;
    return this._http
      .post(url, {
        headers: {
          accept: 'application/json;odata=verbose',
          Authorization: `Bearer ${token}`,
          'X-RequestDigest': this.formDigestValue,
          'IF-MATCH': '*',
          'X-HTTP-Method': 'MERGE',
          'content-type': 'application/json;odata=verbose',
        },
        data: newOb,
      })
      .then((response: any) => {
        let value = response.data.d;
        // value['key'] = value[formatKey(this.config.Type, listName)]
        return { key: id };
      });
  }

  removeItem(listName: string, id: number, token: any) {
    let url = `${process.env.host}${
      process.env.taskRelativePath
    }/_api/web/lists/getbytitle('${
      this.formatTable(listName).name
    }')/items(${id})`;
    return this._http
      .post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-RequestDigest': this.formDigestValue,
          'IF-MATCH': '*',
          'X-HTTP-Method': 'DELETE',
        },
      })
      .then((response: any) => {
        return response.data;
      });
  }

  getTableDataBySitename(siteUrl: string, title: any, token: any) {
    let siteHost = siteUrl.split('/Lists')[0];
    let listUrl = siteUrl.split('/sites')[1];

    let url = `${siteHost}/_api/web/GetList(@listUrl)/RenderListDataAsStream?@listUrl=${encodeURIComponent(
      `'/sites${listUrl}'`,
    )}`;
    return this._http
      .post(url, {
        headers: {
          Accept: 'application/json;odata=verbose',
          Authorization: `Bearer ${token}`,
        },
        data: {
          parameters: {
            // "AddRequiredFields": "true",
            // "DatesInUtc": "true",
            RenderOptions: 7,
            ViewXml:
              `<View><Query>` +
              `<Where><Contains><FieldRef Name='Title'/><Value Type='Text'>${title}</Value></Contains></Where>` +
              `<OrderBy><FieldRef Name="ID" Ascending="true"></FieldRef></OrderBy></Query><ViewFields>` +
              `<FieldRef Name="ID"/></ViewFields></View>`,
          },
        },
      })
      .then((response: any) => {
        let res = response.data;
        return res.ListData.Row.map((e: { ID: any }) => e.ID);
      });
  }

  updateItemBySitename(siteUrl: string, id: number, item: any, token: any) {
    let siteHost = siteUrl.split('/Lists')[0];
    let listUrl = siteUrl.split('/sites')[1];

    let updateItem = Object.keys(item).map((k) => ({
      FieldName: k,
      FieldValue: item[k].toString(),
      HasException: false,
      ErrorMessage: null,
    }));
    let url = `${siteHost}/_api/web/GetList(@a1)/items(@a2)/ValidateUpdateListItem()?@a1=${encodeURIComponent(
      `'/sites${listUrl}'`,
    )}&@a2=${encodeURIComponent(`'${id}'`)}`;
    return this._http
      .post(url, {
        headers: {
          accept: 'application/json;odata=verbose',
          Authorization: `Bearer ${token}`,
          'X-RequestDigest': this.formDigestValue,
          'content-type': 'application/json;odata=verbose',
        },
        data: {
          bNewDocumentUpdate: false,
          checkInComment: null,
          formValues: updateItem,
        },
      })
      .then((response: any) => {
        return response.data;
      });
  }

  removeItemBySitename(siteUrl: string, id: number, token: any) {
    let siteHost = siteUrl.split('/Lists')[0];
    let listUrl = siteUrl.split('/sites')[1];

    let url = `${siteHost}/_api/web/GetList(@a1)/items(@a2)/recycle?@a1=${encodeURIComponent(
      `'/sites${listUrl}'`,
    )}&@a2=${encodeURIComponent(`'${id}'`)}`;
    return this._http
      .post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-RequestDigest': this.formDigestValue,
          // "IF-MATCH": "*",
          // "X-HTTP-Method": "DELETE"
        },
      })
      .then((response: any) => {
        return response.data;
      });
  }

  async uploadFile(
    fileName: string,
    libraryName: string,
    fileObject: any,
    id: string,
    token: any,
  ) {
    let reader = new FileReader();
    let arrayBuffer = await new Promise(
      (resolve: (e: any) => void, reject: (e: any) => void) => {
        reader.onloadend = function (e: any) {
          // console.log('file', e.target.result)
          resolve(e.target.result);
        };
        reader.onerror = function (e: any) {
          reject(e.target.error);
        };
        reader.readAsArrayBuffer(fileObject);
      },
    );
    let url = `${process.env.host}${
      process.env.taskRelativePath
    }/_api/web/getfolderbyserverrelativeurl('${
      process.env.taskRelativePath
    }/${libraryName}/')/files/add(overwrite=true,url='${fileName + '.jpeg'}')`;
    return this._http
      .post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-RequestDigest': this.formDigestValue,
          accept: 'application/json;odata=verbose',
        },
        data: arrayBuffer,
      })
      .then((response: any) => {
        let value = response.data;
        let urls = value.d.ServerRelativeUrl.split(
          process.env.taskRelativePath,
        );
        if (urls[1]) {
          return urls[1];
        } else {
          return value.d.ServerRelativeUrl;
        }
      });
  }

  async updateIcon(file: any, name: string, users: string | any[], token: any) {
    console.log(name);
    let imageUrl = await this.uploadFile(name, 'UserAvatars', file, '', token);
    console.log(imageUrl);
    if (imageUrl) {
      let p = [];
      for (let i = 0; i < users.length; i++) {
        let form = {
          EmployeeId: users[i].EmployeeId,
          OrgUnit: users[i].OrgUnit,
          PositionName: users[i].PositionName,
          LevelName: users[i].LevelName,
          Title: users[i].Title,
          ManagerId: users[i].ManagerId,
          WFCellPhone: users[i].WFCellPhone,
          WorkEmail: users[i].WorkEmail,
          Birthday: users[i].Birthday,
          HireDate: users[i].HireDate,
          Gender: users[i].Gender,
          LeaveDate: users[i].LeaveDate,
          PrincipalName: users[i].PrincipalName,
          Avatar: imageUrl,
          ManagerPrincipalName: users[i].ManagerPrincipalName,
        };
        p.push(this.updateItem('UserInformation', users[i].key, form, token));
      }
      return Promise.all(p).then((res) => {
        return null;
      });
    }
    return null;
  }

  getFormField(siteUrl: string, expand: boolean, token: any) {
    let siteHost = siteUrl.split('/Lists')[0];
    let listUrl = siteUrl.split('/sites')[1];

    let url = `${siteHost}/_api/web/GetList(@listUrl)/RenderListDataAsStream?@listUrl=${encodeURIComponent(
      `'/sites${listUrl}'`,
    )}`;
    return this._http
      .post(url, {
        headers: {
          Accept: 'application/json;odata=verbose',
          Authorization: `Bearer ${token}`,
        },
        data: {
          parameters: {
            // "AddRequiredFields": "true",
            // "DatesInUtc": "true",
            RenderOptions: 4,
          },
        },
      })
      .then((response: any) => {
        let res = response.data;
        let aryRtn = [];
        return res.Field.map(
          (col: { RealFieldName: any; DisplayName: any }) => ({
            Key: col.RealFieldName,
            Title: col.DisplayName,
            EntityPropertyName: col.RealFieldName,
            ...col,
          }),
        ); //aryRtn
      });
  }

  filterUsers(filter: string, token: any) {
    let url = `${process.env.host}${process.env.taskRelativePath}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser`;
    return this._http
      .post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json;odata=verbose',
          accept: 'application/json;odata=verbose',
        },
        data: {
          queryParams: {
            QueryString: filter,
            MaximumEntitySuggestions: 50,
            AllowEmailAddresses: false,
            AllowOnlyEmailAddresses: false,
            PrincipalType: 1,
            PrincipalSource: 15,
            SharePointGroupID: 0,
          },
        },
      })
      .then((response: any) => {
        let value = response.data;
        let pArr: any[] = [];
        JSON.parse(value.d.ClientPeoplePickerSearchUser).map(
          (user: { Key: string }) => {
            pArr.push(this.getEnsureUserById(user.Key, token));
          },
        );
        return Promise.all(pArr).then((res) => {
          let value = res;
          return value.map((e: any) => ({
            label: e.d?.Title,
            value: e.d?.Id,
          }));
        });
      });
  }

  getUserById(userKey: string, token: any) {
    let url = `${process.env.host}${
      process.env.taskRelativePath
    }/_api/web/siteusers(@v1)?@v1='${encodeURIComponent(
      `i:0#.f|membership|${userKey}`,
    )}'`;
    return this._http
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json;odata=verbose',
          accept: 'application/json;odata=verbose',
        },
      })
      .then((response: any) => {
        let value = response.data;
        let item = {
          Title: value.d.Title,
          Value: value.d.UserPrincipalName,
          key: value.d.Id,
        };
        return [item];
      });
  }

  getUserByName(userId: string, token: any) {
    let url = `${process.env.host}${process.env.taskRelativePath}/_api/web/siteusers?$filter=Id eq ${userId}`;
    return this._http
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json;odata=verbose',
          accept: 'application/json;odata=verbose',
        },
      })
      .then((response: any) => {
        let value = response.data;
        return value.d.results.map(
          (e: { Title: any; Email: any; UserPrincipalName: any }) => ({
            // Employee: e,
            // Title: e.DisplayText,
            // WorkEmail: e.EntityData.Email || e.EntityData?.OtherMails || '',
            // WFCellPhone: e.EntityData.WFCellPhone,
            // PrincipalName: e.Key.split('|')[2],
            Title: e.Title,
            WorkEmail: e.Email,
            WFCellPhone: '',
            PrincipalName: e.UserPrincipalName,
          }),
        );
      });
  }

  private getEnsureUserById(userId: string, token: any) {
    let url = `${process.env.host}${process.env.taskRelativePath}/_api/web/EnsureUser`;
    return this._http
      .post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-RequestDigest': this.formDigestValue,
          'content-type': 'application/json;odata=verbose',
          accept: 'application/json;odata=verbose',
        },
        data: "{'logonName':'" + userId + "'}",
      })
      .then((response: any) => {
        return response.data;
      });
  }

  getTimeZone(token: any) {
    let url = `${process.env.host}${process.env.taskRelativePath}/_api/web/RegionalSettings/TimeZone`;
    return this._http
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json;odata=verbose',
        },
      })
      .then((response: any) => {
        return response.data;
      });
  }

  getRole(userId: any, token: any) {
    try {
      let info: any = window['_spPageContextInfo' as any];
      let role = !info || info.isSiteAdmin ? 'admin' : 'user';
      return Promise.resolve(role);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //#region   表单专用函数

  getToken() {
    return process.env.token;
  }

  //#endregion
}
