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
  const formLink = 'http://bv_dpa.com:8001/rentalEquipment?ID=';
  const wfFlowName = 'E6705F85-083C-759E-4249-F0AE5575C921';
  const listName = 'rentalEquipment';

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
              <div className="fileWrapper">
                <Form.Item
                  name="file"
                  label="  Please Upload Capex Approval File (Upload Port)"
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
                label="Whether it is hazardous chemicals (including chemicals that are easy to produce drugs and explosive)"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
              <div className="fileWrapper">
                <Form.Item
                  name="file"
                  label="Please Upload The Purchase Agreement or/ and Guarantee Agreement (Upload Port)"
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
                label=" Whether The Lessor Is The Manufacturer    
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="GeneralGoodsorService"
                label=" Is There Any Guarantee or Other Encumbrance on The Equipment
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="GeneralGoodsorService"
                label="   Whether The Equipment Is An Existing Equipment 
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                  <Radio value={2}>No Sure</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="GeneralGoodsorService"
                label="   Whether It Is Within The Warranty Period of The Manufacturer   
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="GeneralGoodsorService"
                label="  Please fill In The Warranty Period"
                rules={[{ required: true }]}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                name="GeneralGoodsorService"
                label="  Maintenance Obligations
                (Low/Medium/High) "
              >
                <Select>{/* <Option children={undefined}></Option> */}</Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card
          title="C. Lease Term"
          bordered={false}
          style={{ backgroundColor: 'yellow' }}
        >
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="Lease1"
                label="Lease Term 
                (Low/Medium/High)"
                style={{ backgroundColor: 'yellow' }}
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
              <Form.Item
                name="GeneralGoodsorService"
                label="  Whether BV Has The priority To Renew The Lease
                (Low/Medium/High)"
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="D. Payment" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="Payment1"
                label="Contract Amount 
                (Low/Medium/High)"
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
            <Col span={24}>
              <Form.Item
                name="Payment3"
                label="  If it is A Framework Contract, Please Estimate The Amount of Cooperation For One Year. If it is Not A Framework Contract, Please Fill in 
                The Contract Amount "
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment4"
                label="If the budget has been approved 
                (Low/Medium/High)"
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
                label="Is it within the approved budget
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24} style={{ backgroundColor: 'yellow' }}>
              <Form.Item
                name="Payment5"
                label="Whether There Is A Deposit
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Payment7"
                label="Proportion Of Deposit In Annual Rent   
                  (Low/Medium/High)"
                rules={[{ required: true }]}
                style={{ backgroundColor: 'yellow' }}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Payment8"
                label="Payment Cycle 
                (Low/Medium/High)"
                rules={[{ required: true }]}
                style={{ backgroundColor: 'yellow' }}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="E. Contract Template" bordered={false}>
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
