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
  const formLink = 'http://bv_dpa.com:8001/purchaseReorganization?ID=';
  const wfFlowName = '89AA3E63-E484-32E9-FE89-682CC6A2F4DD';
  const listName = 'PurchaseReorganization';

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
    onRemove: (file: any, fileList: any) => {
      if (file.id) {
        return formService.deleteFileItem(file.name);
      }
    },
    beforeUpload: (file: any, fileList: any) => {
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
                name="SupplierCode"
                label="Please Upload The Supplier Code"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="BeenSigned"
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
              <div className="sujectmatter">
                <Form.Item
                  name="SpecialEquipment"
                  label="Special Equipment "
                  rules={[{ required: true }]}
                >
                  <Select>
                    {/* <Option children={undefined}></Option> */}
                  </Select>
                </Form.Item>
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
                    label="Please Provide The Qualification Documents of The Applicant's Site For Using Such Special Equipment (Upload Port)"
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
                  name="ManufacturerorAgent"
                  label=" Is The Supplier Manufacturer or Agent  "
                  rules={[{ required: true }]}
                >
                  <Select>
                    {/* <Option children={undefined}></Option> */}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="LevelsofTheAgent"
                  label="   Levels of The Agent   
                  (Low/Medium/High)  "
                  rules={[{ required: true }]}
                >
                  <Select>
                    {/* <Option children={undefined}></Option> */}
                  </Select>
                </Form.Item>
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
                    label="  Please Upload The Supplier's Proof As The Agent   (Upload Port) "
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
                  name="ExistingEquipment"
                  label=" Whether The Equipment Is An Existing Equipment 
                (Low/Medium/High) "
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio value={0}>Yes</Radio>
                    <Radio value={1}>No</Radio>
                    <Radio value={1}>No Sure</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="TheEquipment"
                  label="   Is There Any Right Encumbrance Such As Mortgage, Seizure And Sealing Up On The Equipment  
                (Low/Medium/High)"
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio value={0}>Yes</Radio>
                    <Radio value={1}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="SupplierPromise"
                  label=" Does The Supplier Promise Not To Infringe The Intellectual Property Rights of Third Parties  
                (Low/Medium/High)  "
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio value={0}>Yes</Radio>
                    <Radio value={1}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Card>

        <Card title="C. Payment" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="ContractAmount "
                label="Contract Amount 
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="aframeworkcontract"
                label="Whether the contract is a framework contract"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={0}>Yes</Radio>
                  <Radio value={1}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="FillContract "
                label="  If it is A Framework Contract, Please Estimate The Amount of Cooperation For One Year. If it is Not A Framework Contract, Please Fill in 
                The Contract Amount "
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="approved"
                label="If the budget has been approved 
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={0}>Yes</Radio>
                  <Radio value={1}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="budget"
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
            <Col span={12}>
              <Form.Item
                name="PaymentMethod"
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
                name="PaymentMethod"
                label="Payment Method"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="InstalmentArrangement"
                label="Instalment Arrangement 
                (Low/Medium/High)"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="PaymentCycle"
                label="Payment Cycle 
                (Low/Medium/High)"
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
            name="Template"
            label="Whether To Use A Mandatory Template"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
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
                name="awarrantyperiod"
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
                name="WarrantyPeriod"
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
                name="period"
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
            name="BVliabilitiecs"
            label="BV's liabilitiecs"
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
    </>
  );
};

export default index;
