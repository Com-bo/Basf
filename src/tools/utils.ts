import moment from 'moment';

// 获取application no type:合同类型SC LC

export const getSerialNum = (type: string) => {
  let code = '';
  for (var i = 0; i < 5; i++) {
    code += (Math.random() * 10).toFixed(0);
  }
  return type + moment().format('YYYYMMDD') + code;
};

export const parseQueryStringArgs = (queryString: string) => {
  let result: any = {};
  queryString = queryString.substring(1);
  let re = /([^&=]+)=([^&]*)/g;
  let m;
  while ((m = re.exec(queryString))) {
    result[m[1]] = m[2];
  }
  return result;
};
