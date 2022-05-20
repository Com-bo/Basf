import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
const { Option } = Select;

const index = (props: any) => {
  //#region   固定模板
  const formLink = 'http://localhost:8001/generalPurchaseForm?ID=';
  const wfFlowName = '4c8d42ce-89f7-4f0a-b8a5-962c08e510c9';
  const listName = 'GeneralPurchase';
  const [buttons, setButtons] = useState([]);
  const [taskInfo, setTaskInfo] = useState<any>({});
  const [bizInfo, setBizInfo] = useState<any>({});
  const [form] = Form.useForm();

  const spService = new SpService();

  useEffect(() => {
    spService
      .getTableData(
        listName,
        [
          {
            type: 'filter eq',
            value: props?.location?.query?.ID,
            properties: ['Id'],
          },
        ],
        [],
      )
      .then((res) => {
        setBizInfo(res[0]);
        form.setFieldsValue(res[0]);
        getButtons(res[0].Title);
      });
  }, [props]);

  const getButtons = (title: string) => {
    if (!props?.location?.query?.Btn) {
      return '';
    }
    spService.getWorkflowTaskInfo(title).then((res) => {
      setTaskInfo(res[0]);
      console.log(res[0]);
      setButtons(JSON.parse(res[0].ResponseOptions));
    });
  };

  const onFlowApprove = (action: string) => {
    spService.submitFlowForm(taskInfo?.key, action).then((res) => {});
  };

  //#endregion

  return (
    <>
      <Form form={form}>
        <Form.Item name="ContractAmount" label={'采购金额'}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="IsMarked" label={'是否HR Mark'}>
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
      {buttons.map((x, index) => {
        return (
          <Button onClick={() => onFlowApprove(x)} key={index}>
            {x}
          </Button>
        );
      })}
    </>
  );
};

export default index;
