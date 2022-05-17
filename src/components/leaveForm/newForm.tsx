import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';

const index = () => {
  //#region   固定模板
  const formLink = 'https://www.baidu.com?ID=';
  const wfFlowName = '06e42010-b8e3-4261-9e10-623ac10f3bf8';
  const listName = 'LRMainItems';

  const [form] = Form.useForm();
  const spService = new SpService();

  //提交表单数据
  const submitForm = (formData: any, isSubmit: boolean) => {
    formData.Title = getSerialNum();
    formData.WFFlowName = wfFlowName;
    spService.submitBizForm(listName, formData, formLink, isSubmit);
  };

  //获取流水号
  const getSerialNum = () => {
    return 'SN' + moment(new Date(), 'YYYYMMDDHHmmss');
  };

  //#endregion

  const onSubmit = () => {
    submitForm(form.getFieldsValue(), true);
  };

  const onSave = () => {
    submitForm(form.getFieldsValue(), false);
  };

  return (
    <>
      <Form form={form}>
        <Form.Item name="LeaveType" label={'请假类型'}>
          <Input />
        </Form.Item>
      </Form>
      <Button onClick={onSubmit}>提交</Button>
      <Button onClick={onSave}>保存</Button>
    </>
  );
};

export default index;
