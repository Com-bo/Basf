import React, { useState, useEffect } from 'react';
import styles from './index.less';
import SpService from '@/services/sharepoint.service';
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
  message,
} from 'antd';
import FormService from '@/services/form.service';
import moment from 'moment';

import { CloudUploadOutlined } from '@ant-design/icons';
const index = () => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/GeneralPurchase?ID=';
  const wfFlowName = '4c8d42ce-89f7-4f0a-b8a5-962c08e510c9';
  const listName = 'GeneralPurchase';

  const [form] = Form.useForm();
  const spService = new SpService();
  const formService = new FormService();

  //提交表单数据
  const submitForm = (formData: any, isSubmit: boolean) => {
    formData.Title = getSerialNum();
    formData.WFFlowName = wfFlowName;
    spService.submitBizForm(listName, formData, formLink, isSubmit);
    formService.submitBizForm(listName, formData, formLink, isSubmit);
  };

  //获取流水号
  const getSerialNum = () => {
    return 'SN' + moment(new Date(), 'YYYYMMDDHHmmss');
    return 'GP' + moment(new Date(), 'YYYYMMDDHHmmss');
  };

  //#endregion

  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const onSubmit = () => {
    submitForm(form.getFieldsValue(), true);
  };

  const onSave = () => {
    submitForm(form.getFieldsValue(), false);
  };
  useEffect(() => {
    // 附件之初始化
    formService.getFileItems().then((res) => {
      if (res && res.length) {
        form.setFieldsValue({
          file: res,
        });
      }
    });
  }, []);

  const uploadProps = {
    onRemove: (file, fileList) => {
      if (file.id) {
        return formService.deleteFileItem(file.name);
      }
    },
    beforeUpload: (file, fileList) => {
      if (!file.id) {
        return formService.uploadFile(file.name, file).then((res) => {
          // 存储文件
          file.id = res;
          return res;
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
        <Card title="B. Subject Matter To Be Procured" bordered={false}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="GeneralGoodsorService"
                label="General Goods or Service"
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="sec-container">
            <div className="sec-title">General Goods</div>
            <div className="sec-content">
              <Row gutter={20}>
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
                  <Form.Item
                    name="SBU"
                    label="SBU"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="-----select--------">
                      {/* <Option></Option> */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                </Col>
                <div className="fileWrapper">
                  <Form.Item
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e && e.fileList;
                    }}
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
                <Col span={12}>
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
                </Col>
                <div className="fileWrapper">
                  <Form.Item
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e && e.fileList;
                    }}
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
                <Col span={12}>
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
                </Col>
                <div className="fileWrapper">
                  <Form.Item
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e && e.fileList;
                    }}
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
                <Col span={24}>
                  <div className="fileWrapper">
                    <Form.Item
                      name="file"
                      valuePropName="fileList"
                      getValueFromEvent={(e: any) => {
                        if (Array.isArray(e)) {
                          return e;
                        }
                        return e && e.fileList;
                      }}
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
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="Environmental"
                    label="Environmental protection (such as sewage discharge), fire fighting and occupational safety articles (A. personal protective equipment; 
   B. fire fighting equipment; C. mandatory inspection equipment; D. others (please fill in the name))"
                  >
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="test"
                    label="Other Good of Environmental Protection"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="test"
                    label="Other Good of Environmental Protection"
                    rules={[{ required: true }]}
                  >
                    <Select></Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="sec-title">Non-Capex Equipment</div>
            <div className="sec-content">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item name="Environmental" label="1111">
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Environmental" label="1111">
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="Environmental" label="1111">
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="fileWrapper">
                    <Form.Item
                      name="file"
                      valuePropName="fileList"
                      getValueFromEvent={(e: any) => {
                        if (Array.isArray(e)) {
                          return e;
                        }
                        return e && e.fileList;
                      }}
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
                  <Col span={24}>
                    <Form.Item name="Environmental" label="1111">
                      <Radio.Group>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={2}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Col>
                <Col span={24}>
                  <Form.Item name="Environmental" label="1111">
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="test"
                    label="Other Good of Environmental Protection"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="test"
                    label="Other Good of Environmental Protection"
                    rules={[{ required: true }]}
                  >
                    <Select></Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="sec-title"> Others</div>
            <div className="sec-content">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    name="test"
                    label="Other Good of Environmental Protection"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="test"
                    label="Other Good of Environmental Protection"
                    rules={[{ required: true }]}
                  >
                    <Select></Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Environmental" label="1111">
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Environmental" label="1111">
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="HSEEngineeringContract"
                    label="HSE Engineering Contract"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="-----select--------">
                      {/* <Option></Option> */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
        <Card title="C. Payment" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="Payment1"
                label="Contract Amount"
                rules={[{ required: true }]}
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
              valuePropName="fileList"
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
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
        <Card title="G.Process Info" bordered={false}>
          <Form.Item
            name="Comments"
            label="Comments"
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
      <Button onClick={onSubmit}>提交</Button>
      <Button onClick={onSave}>保存</Button>
    </>
  );
};

export default index;
