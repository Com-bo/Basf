import HttpService from '@/common/http.service';
import moment from 'moment';
// let formDigestValue = '';
import {
  formatColumn,
  formatColumnByKey,
  formatExpandKey,
  formatKey,
  formatTable,
  getImageColumn,
} from './table-map';

// __________________

var formDigestValue: Promise<any>;

// let url2 = `${process.env.host}${process.env.taskRelativePath}/_api/contextinfo`;
// const formDigestValueAll: any = await http.post(url2, {
//   headers: {
//     Authorization: `Bearer ${process.env.token}`,
//   },
// });
// formDigestValue = formDigestValueAll.data.FormDigestValue;

// ++++++++++++++
const spformatTable = (listName: string) => {
  let table = formatTable(listName);
  console.log(table);
  return {
    name: table['SPList'],
    expand: table.UserExpand,
  };
};

const formatUploadData = (
  item: any,
  table: { name?: any; expand: any },
  listName: string,
) => {
  let newOb: any = {};
  Object.keys(item).forEach((k) => {
    let column = formatColumnByKey(listName, k);
    if (column) {
      if (column.mapValue) {
        newOb[k] = column.mapValue.find(
          (e: { [x: string]: any }) => e['Key'] === item[k],
        )?.['SPList'];
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
};

//#endregion

//#region 附件相关

export const uploadFileFun = async (
  fileName: string,
  libraryName: string,
  fileObject: any,
  path?: string,
) => {
  var http = new HttpService();
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
  var splits = fileName.split('.');
  fileName.lastIndexOf(splits[splits.length - 1]);
  fileName =
    fileName.slice(0, fileName.length - splits[splits.length - 1].length - 1) +
    moment().format('yyyyMMDDHHmmss') +
    '.' +
    splits[splits.length - 1];
  let url = `${process.env.host}${process.env.taskRelativePath}/_api/contextinfo`;
  return http
    .post(url, {
      headers: {
        Authorization: `Bearer ${process.env.token}`,
      },
    })
    .then((response: any) => {
      let res = response.data;
      var fValue = res.FormDigestValue;
      url = `${process.env.host}${path}/_api/web/getfolderbyserverrelativeurl('${path}/${libraryName}/')/files/add(overwrite=true,url='${fileName}')`;
      return http
        .post(url, {
          headers: {
            Authorization: `Bearer ${process.env.token}`,
            'X-RequestDigest': fValue,
            accept: 'application/json;odata=verbose',
          },
          data: arrayBuffer,
        })
        .then((response: any) => {
          let value = response.data;
          value.innerName = fileName;
          return value;
        })
        .catch((e) => {
          return e;
        });
    });
};

//上传附件
export const updateFile = async (
  fileName: string,
  libraryName: string,
  fileObject: any,
  path?: string,
) => {
  var http = new HttpService();
  // let url2 = `${process.env.host}/_api/contextinfo`;

  // http.post(url2, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.token}`,
  //   }
  // })
  // .then((response: any) => {
  //   let res = response.data;

  //   formDigestValue= res.FormDigestValue
  // });

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
  let url = `${process.env.host}${path}/_api/web/GetFileByServerRelativeUrl('${path}/${libraryName}/${fileName}')`;
  return http
    .post(url, {
      headers: {
        Authorization: `Bearer ${process.env.token}`,
        'X-RequestDigest': formDigestValue,
        'X-HTTP-Method': 'PUT',
        accept: 'application/json;odata=verbose',
      },
      data: arrayBuffer,
    })
    .then((response: any) => {
      let value = response.data;
      return value;
    })
    .catch((e) => {
      return e;
    });
};

//获取附件
export const getonFileByUrl = async (url: string) => {
  var http = new HttpService();
  // let url2 = `${process.env.host}${process.env.taskRelativePath}/_api/contextinfo`;

  // http.post(url2, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.token}`,
  //   }
  // })
  // .then((response: any) => {
  //   let res = response.data;

  //   formDigestValue= res.FormDigestValue
  // });
  const res: any = await http.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.token}`,
      'X-RequestDigest': formDigestValue,
      accept: 'application/json;odata=verbose',
    },
  });
  return res.data.d.__metadata;
};

export const updateFileItem = async (file: any, item: any) => {
  var http = new HttpService();
  let url2 = `${process.env.host}${process.env.taskRelativePath}/_api/contextinfo`;

  http
    .post(url2, {
      headers: {
        Authorization: `Bearer ${process.env.token}`,
      },
    })
    .then((response: any) => {
      let res = response.data;
      formDigestValue = res.FormDigestValue;
      var paramsStr = [];
      for (var field in item) {
        paramsStr.push(`'${field}':'${item[field]}'`);
      }
      let body = `{'__metadata':{'type':'${file.type}'},${paramsStr.join(
        ',',
      )}}`;
      return http.post(file.uri, {
        data: body,
        headers: {
          Authorization: `Bearer ${process.env.token}`,
          'X-RequestDigest': formDigestValue,
          'content-type': 'application/json;odata=verbose',
          // 'content-length': body.length,
          'IF-MATCH': '*',
          'X-HTTP-Method': 'MERGE',
        },
      });
    });
};

///通过附件名称获取附件
export const getFileItemByFileName = async (
  listName: string,
  path: string,
  fileName: string,
) => {
  var http = new HttpService();
  // let url2 = `${process.env.host}/_api/contextinfo`;

  // http.post(url2, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.token}`,
  //   }
  // })
  // .then((response: any) => {
  //   let res = response.data;

  //   formDigestValue= res.FormDigestValue
  // });
  let url = `${process.env.host}${path}/_api/web/GetFolderByServerRelativeUrl('${path}/${listName}/')/Files('${fileName}')`;
  return http
    .get(url, {
      headers: {
        Authorization: `Bearer ${process.env.token}`,
        Accept: 'application/json;odata=verbose',
      },
    })
    .then((response: any) => {
      if (response.data.d) {
        return response.data.d;
      }
      return response.data;
    });
};

//通过附件名称删除附件
export const deleteFileItem = async (
  listName: string,
  fileName: string,
  path: string,
) => {
  var http = new HttpService();
  // let url2 = `${process.env.host}/_api/contextinfo`;

  // http.post(url2, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.token}`,
  //   }
  // })
  // .then((response: any) => {
  //   let res = response.data;

  //   formDigestValue= res.FormDigestValue
  // });
  let url = `${process.env.host}${path}/_api/web/GetFileByServerRelativeUrl('${path}/${listName}/${fileName}')`;
  return http
    .post(url, {
      headers: {
        Authorization: `Bearer ${process.env.token}`,
        'X-RequestDigest': formDigestValue,
        'IF-MATCH': '*',
        'X-HTTP-Method': 'DELETE',
      },
    })
    .then((response: any) => {
      return true;
    });
};

//#endregion

//#region  list相关

export const addItem = async (listName: string, item: any, path?: string) => {
  let table = spformatTable(listName);
  var http = new HttpService();
  // let url2 = `${process.env.host}/_api/contextinfo`;

  // http.post(url2, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.token}`,
  //   }
  // })
  // .then((response: any) => {
  //   let res = response.data;

  //   formDigestValue= res.FormDigestValue
  // });
  let newOb = formatUploadData(item, table, listName);
  let url = `${process.env.host}${path}/_api/web/lists/getbytitle('${
    spformatTable(listName).name
  }')/items`;
  return http
    .post(url, {
      headers: {
        Accept: 'application/json;odata=verbose',
        Authorization: `Bearer ${process.env.token}`,
        'X-RequestDigest': formDigestValue,
      },
      data: newOb,
    })
    .then((response: any) => {
      let value = response.data.d;
      value['key'] = value[formatKey('SPList', listName)];
      return value;
    });
};

export const removeItem = async (listName: string, id: any, path: string) => {
  var http = new HttpService();
  // let url2 = `${process.env.host}/_api/contextinfo`;

  // http.post(url2, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.token}`,
  //   }
  // })
  // .then((response: any) => {
  //   let res = response.data;

  //   formDigestValue= res.FormDigestValue
  // });
  let url = `${process.env.host}${path}/_api/web/lists/getbytitle('${
    spformatTable(listName).name
  }')/items(${id})`;
  return http
    .post(url, {
      headers: {
        Authorization: `Bearer ${process.env.token}`,
        'X-RequestDigest': formDigestValue,
        'IF-MATCH': '*',
        'X-HTTP-Method': 'DELETE',
      },
    })
    .then((response: any) => {
      return response.data;
    });
};

export const updateItem = async (
  listName: string,
  id: number,
  item: any,
  path: string,
) => {
  let table = spformatTable(listName);
  let newOb = formatUploadData(item, table, listName);
  newOb['__metadata'] = { type: `SP.Data.${listName}ListItem` };
  var http = new HttpService();
  let url = `${process.env.host}${path}/_api/web/lists/getbytitle('${
    spformatTable(listName).name
  }')/items(${id})`;
  return http
    .post(url, {
      headers: {
        accept: 'application/json;odata=verbose',
        Authorization: `Bearer ${process.env.token}`,
        'X-RequestDigest': formDigestValue,
        'IF-MATCH': '*',
        'X-HTTP-Method': 'MERGE',
        'content-type': 'application/json;odata=verbose',
      },
      data: newOb,
    })
    .then((response: any) => {
      return { key: id };
    });
};

function constructor() {
  throw new Error('Function not implemented.');
}
//#endregion
