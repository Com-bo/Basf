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
  DatePicker,
} from 'antd';
import FormService from '@/services/form.service';
import ApprovalActions from '@/components/procOptions/procOptions';
import moment from 'moment';
import { CloudUploadOutlined } from '@ant-design/icons';
const index = () => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/leasedEquipmentForm';
  const wfFlowName = 'd8ef091e-c03b-8fb3-ccad-0045f4722872';
  const listName = 'LeasedEquipment';

  const [form] = Form.useForm();
  const formService = new FormService();

  //获取流水号
  const getSerialNum = () => {
    return 'SN' + moment(new Date(), 'YYYYMMDDHHmmss');
    return 'GP' + moment(new Date(), 'YYYYMMDDHHmmss');
  };

  //#endregion

  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const onSubmit = () => {
    return form.validateFields().then((res) => {
      return {
        isOk: true,
        formData: form.getFieldsValue(),
        formLink,
        wfFlowName,
        listName,
      };
    });
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
                name="BVSign"
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
              <Form.Item name="Site" label="Site" rules={[{ required: true }]}>
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="NameOtherParty"
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
                name="IsBPCCSigned"
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
        <Card title="B. Subject Matter To Be Lease" bordered={false}>
          <Row gutter={20}>
            <Col span={24}>
              <div className="fileWrapper">
                <Form.Item
                  name="CapexApprovalFile"
                  valuePropName="fileList"
                  getValueFromEvent={(e: any) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  }}
                  label="Please Upload Capex Approval File (Upload Port)"
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
                name="IsFinancialLease"
                label="Whether It Is A Financial Lease"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="fileWrapper">
                <Form.Item
                  name="AgreementFile"
                  valuePropName="fileList"
                  getValueFromEvent={(e: any) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  }}
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
            </Col>
            <Col span={24}>
              <Form.Item
                name="IsManufacturer"
                label="Whether The Lessor Is The Manufacturer"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="IsGuaranteeorEncumbrance"
                label="Is There Any Guarantee or Other Encumbrance On The Equipment"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="IsExistEquipment"
                label="Whether The Equipment Is An Existing Equipment"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                  <Radio value={-1}>Not Sure</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="ManufacturerWithinWarrantyPeriod"
                label="Whether It Is Within The Warranty Period Of The Manufacturer"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="ManufacturerWithinWarrantyPeriod"
                label="Whether It Is Within The Warranty Period Of The Manufacturer"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="WarrantyPeriod"
                label="Please Fill In The Warranty Period"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="MaintenanceObligations"
                label="Maintenance Obligations"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="C. Lease Term" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="LeaseTerm"
                label="Lease Term"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="IsBVToRenewLease"
                label="Whether BV Has The Priority To Renew The Lease"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="D. Payment" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="ContractAmountScope"
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
                name="IsFrameworkContract"
                label="Whether The Contract Is A Framework Contract"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="ContractAmount"
                label="If It Is A Framework Contract, Please Estimate The Amount of Cooperation For One Year. If It Is Not A Framework Contract, Please Fill In  The Contract Amount"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: '50%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="IsBudgetApproved"
                label="If The Budget Has Been Approved"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="WithinBudgetApproved"
                label="Is it Within The Approved Budget"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="IsDeposit"
                label="Whether There Is A Deposit"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ProportionDepositAnnualRent"
                label="Proportion of Deposit In Annual Rent"
                rules={[{ required: true }]}
              >
                <Select placeholder="-----select--------">
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="PaymentCycle"
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
        <Card title="E. Contract Template" bordered={false}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="IsMandatoryTemplate"
                label="Whether To Use A Mandatory Template"
                rules={[{ required: true }]}
              >
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
            </Col>
          </Row>
        </Card>

        <Card title="F. BV's liabilities" bordered={false}>
          <Form.Item
            name="BVliabilities"
            label="BV's liabilities"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Card>
        <ApprovalActions formValidataion={onSubmit}></ApprovalActions>
      </Form>
    </>
  );
};

export default index;
