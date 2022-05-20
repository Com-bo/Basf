import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import SpService from '@/services/sharepoint.service';

const index = (props: any) => {
  const [form] = Form.useForm();
  const spService = new SpService();
  const [buttons, setButtons] = useState([]);
  const [taskInfo, setTaskInfo] = useState<any>({});
  const [bizInfo, setBizInfo] = useState<any>({});

  useEffect(() => {
    spService
      .getTableData(
        'LRMainItems',
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

  return (
    <>
      <Form form={form}>
        <Form.Item name="LeaveType" label={'请假类型'}>
          <Input disabled />
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
