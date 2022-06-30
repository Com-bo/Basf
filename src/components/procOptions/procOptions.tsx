import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect } from 'react';
import SpService from '@/services/sharepoint.service';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
} from 'antd';

interface IProps {
  wfFlowName?: string;
  formValidataion: Function;
  approvalRender: React.ReactNode;
  callBack?: Function;
}

interface IBForm {
  isOK: boolean;
  formData: object;
  formLink: string;
  wfFlowName: string;
  listName: string;
}

const index = (props: IProps) => {
  const spService = new SpService();
  const [form] = Form.useForm();
  const [comments, setComments] = useState('');
  const [buttons, setButtons] = useState(Array<string>());

  //获取按钮类型
  useEffect(() => {
    if (props.wfFlowName) {
      spService
        .getLastTaskInfo(
          [
            {
              type: 'filter eq',
              value: props.wfFlowName,
              properties: ['WFFlowName'],
            },
          ],
          [],
        )
        .then((res) => {
          setButtons(JSON.parse(res?.ResponseOptions));
        });
    } else {
      setButtons(['Submit', 'Save']);
    }
  }, [props]);

  //#region   按钮事件

  //表单提交
  const onSubmit = async () => {
    let res: IBForm = await props.formValidataion().catch((e: any) => {
      console.error(e);
    });
    if (res.isOK) {
      const valid = await form.validateFields().catch((e: any) => {
        console.error(e);
      });
      if (valid) {
        Modal.confirm({
          title: 'Tips',
          content: '是否确认发起流程？',
          okText: '确认发起',
          cancelText: '取消',
          onOk: () => {
            spService
              .submitBizForm(res.listName, res.formData, res.formLink, true)
              .then((res) => {
                console.log(res);
                props.callBack && props.callBack(res);
              })
              .catch((e) => message.error(e));
          },
        });
      }
    }
  };

  const onSave = () => {
    props.formValidataion().then((res: IBForm) => {
      if (res.isOK) {
        Modal.confirm({
          title: 'Tips',
          content: '是否确认保存流程？',
          okText: '确认保存',
          cancelText: '取消',
          onOk: () => {
            spService
              .submitBizForm(res.listName, res.formData, res.formLink, true)
              .then((res) => {
                console.log(res);
                props.callBack && props.callBack(res);
              })
              .catch((e) => message.error(e));
          },
        });
      }
    });
  };

  //#endregion

  return (
    <>
      {/* <Card title="Process Info" bordered={false}>
        <Form.Item label="Comments">
          <TextArea
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          ></TextArea>
        </Form.Item>
      
      </Card> */}

      {props.approvalRender}
      <div className="actionWrapper">
        <Space size={20}>
          <Button
            onClick={onSave}
            hidden={buttons.indexOf('Save') < 0}
            type="default"
          >
            Save
          </Button>
          <Button
            onClick={onSubmit}
            hidden={buttons.indexOf('Submit') < 0}
            danger
          >
            Submit
          </Button>
          <Button hidden={buttons.indexOf('Approve') < 0}>同意</Button>
          <Button hidden={buttons.indexOf('Reject') < 0}>拒绝</Button>
          <Button hidden={buttons.indexOf('Trans') < 0}>转移任务</Button>
          <Button hidden={buttons.indexOf('Add') < 0}>加签</Button>
          <Button hidden={buttons.indexOf('Post') < 0}>提交</Button>
          <Button hidden={buttons.indexOf('Return') < 0}>退回</Button>
          <Button hidden={buttons.indexOf('NotAllow') < 0}>不同意</Button>
        </Space>
      </div>
    </>
  );
};

export default index;
