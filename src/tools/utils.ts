import FormService from '@/services/form.service';
import moment from 'moment';

// 获取application no
export const getapplicationNo = async (
  listName: string,
  formService: FormService,
) => {
  // 1.首先生成规则SC+YYYY/MM/DD+五位流水号
  let _applicationNo = `SC${moment().format('YYYY/MM/DD')}`;
  // 需要从表里查一下数据号，然后生成
  let numStr = '';
  try {
    // 保留五位数，不够补零
    const data = await formService.getTableDataAll(listName);
    let num = data.length + 1;
    numStr = num.toString();
    if (numStr.length < 5) {
      for (let i = numStr.length; i < 5; i++) {
        numStr = '0' + numStr;
      }
    } else {
    }
  } catch (error) {
    console.log(error);
  }
  return _applicationNo + numStr;
};
