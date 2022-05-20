import React, { useState, useEffect } from 'react';
import './index.less';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Card,
  Row,
  Col,
  Radio,
  Tabs,
  Upload,
  Space,
} from 'antd';
import FormService from '@/services/form.service';
import moment from 'moment';

import { CloudUploadOutlined } from '@ant-design/icons';
const index = () => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/purchaseEquipment?ID=';
  const wfFlowName = '4155DE5E-706F-076F-41C0-FD5BA8397763';
  const listName = 'purchaseEquipment';

  const [form] = Form.useForm();
  const formService = new FormService();

  //提交表单数据
  const submitForm = (formData: any, isSubmit: boolean) => {
    formData.Title = getSerialNum();
    formData.WFFlowName = wfFlowName;
    formService.submitBizForm(listName, formData, formLink, isSubmit);
  };

  //获取流水号
  const getSerialNum = () => {
    return 'GP' + moment(new Date(), 'YYYYMMDDHHmmss');
  };

  //#endregion
  const { Option } = Select;
  const onSubmit = () => {
    submitForm(form.getFieldsValue(), true);
  };

  const onSave = () => {
    submitForm(form.getFieldsValue(), false);
  };
  useEffect(() => {
    // formService.deleteFileItem( "清关导入模板.xlsx").then(res=>{
    //   // 存储文件
    //   alert("删除成功")
    // })
    // formService.getTableDataAll('ProcAttachList').then((res) => {
    //   debugger;
    // });
  }, []);

  const uploadProps = {
    onRemove: (file) => {
      // debugger
    },
    beforeUpload: (file, fileList) => {
      if (file.lastModified) {
        // 此处上传文件
        formService.uploadFile(file.name, file).then((res) => {
          // 存储文件
        });
      }
      return false;
    },
  };

  return (
    <>
      <Form form={form} layout="vertical" className="leaveForm">
        <Card title="A. General Information" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="Requester" label="Requester">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="RequestDate" label="Request Date">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="BVSigningEntity"
                label="BV Signing Entity"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="SBU" label="SBU" rules={[{ required: true }]}>
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="site" label="Site" rules={[{ required: true }]}>
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="NameofTheOtherParty"
                label="Name of The Other Party"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="PleaseUploadTheSupplierCode"
                label="Please Upload The Supplier Code"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="IfBPCCHasBeenSigned"
                label="If BPCC Has Been Signed"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>A</Radio>
                  <Radio value={2}>B</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card
          title="B. Subject Matter To Be Procured"
          bordered={false}
          style={{ backgroundColor: 'yellow' }}
        >
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item name="pecialequipment" label="Special Equipment">
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
              <div className="fileWrapper">
                <Form.Item
                  name="file"
                  label="  Please Provide The Qualification Documents Of The Applicant's Site For  Using Such Special Equipment (Upload Port)  "
                  rules={[{ required: true }]}
                >
                  <Upload {...uploadProps}>
                    <div className="file_upload">
                      <CloudUploadOutlined />
                      <br />
                      <span>Upload</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
              <Form.Item
                name="IsTheSupplier"
                label="Is The Supplier Manufacturer Or Agent"
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
              <Form.Item name="LevelsOfTheAgent" label="Levels Of The Agent">
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
              <div className="fileWrapper">
                <Form.Item
                  name="file"
                  label="     Please Upload The Supplier's Proof As The Agent   (upload port)  "
                  rules={[{ required: true }]}
                >
                  <Upload {...uploadProps}>
                    <div className="file_upload">
                      <CloudUploadOutlined />
                      <br />
                      <span>Upload</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
              <Form.Item
                name="GeneralGoodsorService"
                label="   Does The Supplier Promise Not To Infringe The Intellectual Property Rights of Third Parties
                    (Low/Medium/High) "
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                  <Radio value={3}>No Sure</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="GeneralGoodsorService"
                label="   Does The Supplier Promise Not To Infringe The Intellectual Property Rights of Third Parties
                    (Low/Medium/High) "
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="C. Payment" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="Payment1"
                label="Contract Amount"
                rules={[{ required: true }]}
                style={{ backgroundColor: 'yellow' }}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment2"
                label="Whether the contract is a framework contract"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment3"
                label="If it is a framework contract, please estimate the amount of cooperation for one year."
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment4"
                label="If the budget has been approved"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment5"
                label="Is it within the approved budget"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment6"
                label="Payment Method"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment7"
                label="Payment Method"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment8"
                label="Instalment Arrangement"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment9"
                label="Payment Cycle"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="D. Contract Template" bordered={false}>
          <Form.Item
            name="Contract1"
            label="Whether To Use A Mandatory Template"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <div className="sec-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Category1" key="1">
                <a href="#">XXXXXXXXXXXX XXXXXX Contract Template.docx</a>
              </TabPane>
              <TabPane tab="Category2" key="2">
                <a href="#">XXXXXXXXXXXX XXXXXX Contract Template.docx</a>
              </TabPane>
              <TabPane tab="Category3" key="3">
                <a href="#">XXXXXXXXXXXX XXXXXX Contract Template.docx</a>
              </TabPane>
            </Tabs>
          </div> */}
          <div className="fileWrapper">
            <Form.Item
              name="file"
              label="Upload Contract Attachment"
              rules={[{ required: true }]}
            >
              <Upload {...uploadProps}>
                <div className="file_upload">
                  <CloudUploadOutlined />
                  <br />
                  <span>Upload</span>
                </div>
              </Upload>
            </Form.Item>
          </div>
        </Card>
        <Card title="E. After-sale Arrangement" bordered={false}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="Arrangement1"
                label="Is there a warranty period"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Arrangement2"
                label="Warranty Period"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Arrangement3"
                label="Why there is no warranty period"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="F. BV's liabilities" bordered={false}>
          <Form.Item
            name="liabilities"
            label="BV's liabilities"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Card>
        <div className="actionWrapper">
          <Space size={20}>
            <Button onClick={onSave} type="default">
              Save
            </Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
};

export default index;
