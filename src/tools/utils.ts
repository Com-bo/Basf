import moment from 'moment';

// 获取application no

export const getSerialNum = () => {
  let code = '';
  for (var i = 0; i < 5; i++) {
    code += (Math.random() * 10).toFixed(0);
  }
  return 'SC' + moment(new Date(), 'YYYYMMDD') + code;
};
