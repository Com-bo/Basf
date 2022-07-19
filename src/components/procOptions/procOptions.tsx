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
  applicationNo?: string; //流水号
  wfFlowName?: string;
  formValidataion: Function;
  callBack?: Function;
  setLoading?: any;
  keyId?: number;
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
    if (props.applicationNo) {
      spService
        .getLastTaskInfo(
          [
            {
              type: 'filter contains',
              value: `[${props.applicationNo}]`,
              properties: ['Title'],
            },
          ],
          [],
          props.keyId,
        )
        .then((res) => {
          console.log(res);
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
    if (res?.isOK) {
      const valid = await form.validateFields().catch((e: any) => {
        console.error(e);
      });
      if (valid) {
        // 需要生成applicarionno
        Modal.confirm({
          title: 'Tips',
          content: '是否确认发起流程？',
          okText: '确认发起',
          cancelText: '取消',
          onOk: async () => {
            try {
              var spRes = await spService.submitBizForm(
                res.listName,
                res.formData,
                res.formLink,
                res.wfFlowName,
                true,
              );
              props.callBack && props.callBack(spRes);
            } catch (error) {}
          },
        });
      }
    } else {
      message.error('表单验证失败！');
      props.callBack && props.callBack();
    }
  };

  const flowSubmit = async (action: string) => {
    let res: IBForm = await props.formValidataion().catch((e: any) => {
      console.error(e);
    });
    if (res?.isOK) {
      Modal.confirm({
        title: 'Tips',
        content: `Confirm ${action} this flow？`,
        okText: 'Confirm',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            var spRes = await spService.submitFlowForm(
              props.keyId ?? 0,
              action,
            );
            props.callBack && props.callBack(spRes);
          } catch (error) {
            console.error(error);
          }
        },
      });
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
          onOk: async () => {
            var spRes = await spService.submitBizForm(
              res.listName,
              res.formData,
              res.formLink,
              res.wfFlowName,
              true,
            );
            props.callBack && props.callBack(spRes);
          },
        });
      }
    });
  };

  //#endregion

  return (
    <>
      {/* {props.approvalRender} */}
      <Card title="Process Info" bordered={false}>
        <Form.Item label="Comments">
          <TextArea
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          ></TextArea>
        </Form.Item>
      </Card>
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
          {/* 同意 */}
          <Button
            hidden={buttons.indexOf('Approve') < 0}
            type="primary"
            onClick={() => {
              flowSubmit('Approve');
            }}
          >
            Approve
          </Button>
          {/* 拒绝 */}
          <Button
            hidden={buttons.indexOf('Reject') < 0}
            type="default"
            onClick={() => {
              flowSubmit('Reject');
            }}
          >
            Reject
          </Button>
          {/* 转移任务 */}
          <Button
            hidden={buttons.indexOf('Trans') < 0}
            onClick={() => {
              flowSubmit('Trans');
            }}
          >
            Trans
          </Button>
          {/* 加签 */}
          <Button
            hidden={buttons.indexOf('Add') < 0}
            onClick={() => {
              flowSubmit('Add');
            }}
          >
            Add
          </Button>
          {/* 提交 */}
          <Button
            hidden={buttons.indexOf('Post') < 0}
            onClick={() => {
              flowSubmit('Post');
            }}
          >
            Post
          </Button>
          {/* 退回 */}
          <Button
            hidden={buttons.indexOf('Return') < 0}
            onClick={() => {
              flowSubmit('Return');
            }}
          >
            Return
          </Button>
          {/* 不同意 */}
          <Button
            hidden={buttons.indexOf('NotAllow') < 0}
            onClick={() => {
              flowSubmit('NotAllow');
            }}
          >
            NotAllow
          </Button>
        </Space>
      </div>
    </>
  );
};

export default index;
