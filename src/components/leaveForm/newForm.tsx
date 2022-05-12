import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
const { Option } = Select;

const index = () => {
  //#region   固定模板
  const formLink = 'http://localhost:8001/generalPurchaseForm?ID=';
  const wfFlowName = '4c8d42ce-89f7-4f0a-b8a5-962c08e510c9';
  const listName = 'GeneralPurchase';

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
    return 'GP' + moment(new Date(), 'YYYYMMDDHHmmss');
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
        <Form.Item name="ContractAmount" label={'采购金额'}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="LeaveType" label={'是否HR Mark'}>
          <Select>
            <Option value={1} key={1}>
              Has Marked
            </Option>
            <Option value={0} key={0}>
              Not Marked
            </Option>
          </Select>
        </Form.Item>
      </Form>
      <Button onClick={onSubmit}>提交</Button>
      <Button onClick={onSave}>保存</Button>
    </>
  );
};

export default index;
