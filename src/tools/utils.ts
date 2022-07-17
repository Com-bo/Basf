import moment from 'moment';

// 获取application no type:合同类型SC LC

export const getSerialNum = (type: string) => {
  let code = '';
  for (var i = 0; i < 5; i++) {
    code += (Math.random() * 10).toFixed(0);
  }
  return type + moment().format('YYYY/MM/DD') + code;
};
