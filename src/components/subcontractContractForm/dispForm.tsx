import React, { useState, useEffect } from 'react';
import styles from './index.less';

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
  Tooltip,
} from 'antd';
import FormService from '@/services/form.service';
import moment from 'moment';
import ApprovalActions from '@/components/procOptions/procOptions';
import Loading from '@/components/loading/Loading';
import { CloudUploadOutlined, BellOutlined } from '@ant-design/icons';

interface OptionItem {
  key: number;
  Title: string;
}
const index = (props: any) => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/subcontractContract?ID=';
  const wfFlowName = '6C941EF0-0464-088B-E2EF-7022F59C1CA5';
  const listName = 'SubContractContract';
  const [applicationNo, setApplicationNo] = useState('');
  const [form] = Form.useForm();
  // const spService = new SpService();
  const formService = new FormService();
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    console.log(form.getFieldsValue());
    return form.validateFields().then((res) => {
      // 计算审批人

      let functionApprovers: any = [];
      let fucntions = [
        'Procurement',
        'FinanceController',
        'DataSecurity',
        'Legal',
      ];
      fucntions.forEach((element) => {
        if (form.getFieldValue([element])) {
          functionApprovers.push(form.getFieldValue([element]));
        }
      });
      const params = {
        ...form.getFieldsValue(),
        FunctionApprovers: Array.from(new Set(functionApprovers)).join(';'),
        SiteGMApprovers: form.getFieldValue('SiteGM'),
        CountryManageGMApprovers: form.getFieldValue('CountryManagerGM'),
        RegionalVPApprovers: form.getFieldValue('RegionalVP'),
        CFOApprovers: form.getFieldValue('CFO'),
      };
      delete params.file;
      return {
        isOK: true,
        formData: params,
        formLink,
        applicationNo,
        wfFlowName,
        listName,
      };
    });
  };
  useEffect(() => {
    // 附件之初始化获取id
    if (props.location.query?.ID) {
      return;
    }
    formService
      .getTableData(
        listName,
        [
          {
            type: 'filter eq',
            value: props.location.query?.ID,
            properties: ['ID'],
          },
        ],
        [],
      )
      .then((res) => {
        if (res && res.length) {
          console.log(res[0]);
          setApplicationNo(res[0].Title);
          form.setFieldsValue({
            ...res[0],
            RequestDate: moment(res[0].RequestDate),
          });
        }
        return formService.getFileItems(listName, props.location.query?.ID);
      })
      .then((res) => {
        if (res && res.length) {
          form.setFieldsValue({
            file: res,
          });
        }
      });
  }, []);

  const uploadProps = {
    beforeUpload: (file: any, fileList: any) => {
      return false;
    },
  };
  const getLevel = (type: string) => {
    switch (type) {
      case 'Low':
        return (
          <span
            style={{
              display: 'inline-block',
              fontSize: '14px',
              marginLeft: '10px',
              verticalAlign: 'middle',
              color: '#2588c9',
              backgroundColor: '#e9f3f3',
              height: '18px',
              padding: '0 5px',
              borderRadius: '9px',
              lineHeight: '18px',
              textAlign: 'center',
            }}
          >
            {type}
          </span>
        );
      case 'High':
        return (
          <span
            style={{
              display: 'inline-block',
              fontSize: '14px',
              marginLeft: '10px',
              verticalAlign: 'middle',
              color: '#bd1738',
              backgroundColor: '#f8e7eb',
              height: '18px',
              padding: '0 5px',
              borderRadius: '9px',
              lineHeight: '18px',
              textAlign: 'center',
            }}
          >
            {type}
          </span>
        );
      case 'Medium':
        return (
          <span
            style={{
              display: 'inline-block',
              fontSize: '14px',
              marginLeft: '10px',
              verticalAlign: 'middle',
              color: '#d0a11d',
              backgroundColor: '#faf5e8',
              height: '18px',
              padding: '0 5px',
              borderRadius: '9px',
              lineHeight: '18px',
              textAlign: 'center',
            }}
          >
            {type}
          </span>
        );
      default:
        return '';
    }
  };
  return (
    <>
      <Form form={form} layout="vertical" className="subcontractContractForm">
        <Card title="A. General Information" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="Title" label="Application No.">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="RequestDate" label="Request Date">
                <DatePicker
                  format="YYYY/MM/DD"
                  disabled
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Requester" label="Requester">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <div className="sec-container">
            <div className="sec-title">BV Entity Information </div>
            <div className="sec-content">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    name="Region"
                    label="Region"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Country"
                    label="Country"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="SBU"
                    label="SBU"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="BVSigningEntity"
                    label="BV Signing Entity"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Site"
                    label="Site"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="sec-title">Counterparty Information</div>
            <div className="sec-content">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    name="NameofCounterparty"
                    label="Name of Counterparty"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="SupplierCode"
                    label="Please upload the supplier code"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="CoEOrBPCCSigned"
                    label="CoE / BPCC declaration signed or not"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group disabled>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="EntityOfBVCPS"
                    label={
                      <>
                        Whether the subcontractor is an entity of BVCPS
                        <Tooltip title="Note, the CoE/BPCC declaration must be signed before or together with the contract.">
                          <BellOutlined />
                        </Tooltip>
                      </>
                    }
                  >
                    <Radio.Group disabled>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {form.getFieldValue('EntityOfBVCPS') == 1 ? (
                  <Col span={24}>
                    <Form.Item
                      name="LocatedInCountryListed"
                      label="Whether the subcontractor is located in a country listed under BV Sanctions policy"
                      rules={[{ required: true }]}
                    >
                      <Radio.Group disabled>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                ) : (
                  ''
                )}
                {form.getFieldValue('LocatedInCountryListed') &&
                form.getFieldValue('EntityOfBVCPS') == 1 ? (
                  <Col span={24}>
                    <Form.Item
                      name="ProposedServicesConnection"
                      label={
                        <>
                          Whether the proposed services provided by the
                          subcontractor will have any connection to any country
                          listed under BV Sanctions policy
                          <Tooltip title="A “connection” can mean the country where a) the services are performed, b) the product will be imported, c) the related client / manufacturer / ">
                            <BellOutlined />
                          </Tooltip>
                        </>
                      }
                      rules={[{ required: true }]}
                    >
                      <Radio.Group disabled>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                ) : (
                  ''
                )}
              </Row>
            </div>
          </div>
        </Card>
        <Card title="B.Contract Amount and Payment" bordered={false}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="ContractAmount"
                label="Contract Amount for one year of service"
                rules={[{ required: true }]}
              >
                <Input placeholder="Please input" disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="AnnualContractSum"
                label={
                  <>
                    Please state the annual contract sum (if known) or provide
                    an estimate annual contract sum
                    <Tooltip title="The applicant can fill in either the local currency or USD">
                      <BellOutlined />
                    </Tooltip>
                  </>
                }
              >
                <Input placeholder="Please input" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="BudgetApproved"
                label="If the budget has been approved"
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                  <Radio value={-1}>No approved budget is required</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ContractSumWithinBudget"
                label="Is the contract sum within the approved budget"
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="PaymentTerm"
                label="Please summarize the payment term"
              >
                <Input placeholder="Please input" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="OthersPaymentTerm"
                label="Please provide the others payment term"
              >
                <Input placeholder="Please input" disabled />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card
          title="C. Technical Aspects of Project and Contract Terms"
          bordered={false}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                required={false}
                name="NeededReason"
                label={
                  <>
                    Please describe why the subcontractor is needed{' '}
                    {getLevel(
                      form.getFieldValue('NeededReason') !== 'Others' &&
                        form.getFieldValue('NeededReason')
                        ? 'Low'
                        : '',
                    )}{' '}
                  </>
                }
                rules={[{ required: true }]}
              >
                <Input placeholder="Please input" disabled />
              </Form.Item>
            </Col>
            {form.getFieldValue('NeededReason') === 'Others' ? (
              <Col span={24}>
                <Form.Item
                  name="NeededReasonExplain"
                  label="Please explain the reason"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea placeholder="Please input" disabled />
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
            <Col span={12}>
              <Form.Item
                required={false}
                name="RequestService"
                label={
                  <>
                    Did a BV customer or government official request the
                    service?<span className="dot_required">*</span>
                    {getLevel(
                      form.getFieldValue('RequestService') == 1
                        ? 'High'
                        : form.getFieldValue('RequestService') === 0
                        ? 'Low'
                        : '',
                    )}
                  </>
                }
                rules={[{ required: true }]}
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {form.getFieldValue('RequestService') ? (
              ''
            ) : (
              <Col span={24}>
                <Form.Item
                  name="Background"
                  label="Please provide the background"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea placeholder="Please input" disabled />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item
                name="HasLicense"
                required={false}
                label={
                  <>
                    Whether the subcontractor has license to operate ("LTO")
                    required by the project?
                    <span className="dot_required">*</span>
                    {getLevel(
                      form.getFieldValue('HasLicense') == 1
                        ? 'High'
                        : form.getFieldValue('HasLicense') === 0
                        ? 'Low'
                        : '',
                    )}
                  </>
                }
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {form.getFieldValue('HasLicense') == 1 ? (
              <Col span={12}>
                <Form.Item
                  name="InsertLTO"
                  label="Please insert the LTO of the subcontractor"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Please input" />
                </Form.Item>
              </Col>
            ) : form.getFieldValue('HasLicense') === 0 ? (
              <Col span={24}>
                <Form.Item
                  name="NoLicenseReason"
                  label="Please explain the reason"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea placeholder="Please input" disabled />
                </Form.Item>
              </Col>
            ) : (
              ''
            )}

            <Col span={12}>
              <Form.Item
                required={false}
                name="UnethicalBehaviorRequired"
                label={
                  <>
                    Does the contracting process require unethical behavior?
                    <span className="dot_required">*</span>
                    {getLevel(
                      form.getFieldValue('UnethicalBehaviorRequired') === 1
                        ? 'High'
                        : form.getFieldValue('UnethicalBehaviorRequired') === 0
                        ? 'Low'
                        : '',
                    )}
                  </>
                }
                rules={[{ required: true }]}
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                required={false}
                name="FamilyMemberHere"
                label={
                  <>
                    <span>
                      Do you or your family member have any interest in the
                      subcontractor or does your family member work for or in
                      the subcontractor?<span className="dot_required">*</span>
                      {getLevel(
                        form.getFieldValue('FamilyMemberHere') == 1
                          ? 'High'
                          : form.getFieldValue('FamilyMemberHere') === 0
                          ? 'Low'
                          : '',
                      )}
                    </span>
                  </>
                }
                rules={[{ required: true }]}
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                required={false}
                name="ProcessInfo"
                label={
                  <>
                    <span>
                      Will the subcontractor be processing personal data on
                      behalf of BV or accessing any of BV’s Information System?
                      <span className="dot_required">*</span>
                    </span>
                  </>
                }
                rules={[{ required: true }]}
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Agreement"
                label="Please provide the term of the agreement"
              >
                <Input placeholder="Please input" disabled />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="D.Others" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="UseMandatoryTemplate"
                label={
                  <>
                    Whether to use a BV Mandatory template
                    <Tooltip title="In principle, BV entities shall use our standard template for subcontractor agreements.">
                      <BellOutlined />
                    </Tooltip>
                    {getLevel(
                      form.getFieldValue('UseMandatoryTemplate') === 0
                        ? 'High'
                        : form.getFieldValue('UseMandatoryTemplate') === 1
                        ? 'Low'
                        : '',
                    )}
                  </>
                }
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="HasMaterialChanges"
                label="Whether there is any material changes to any term of the agreement"
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
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
                  <Upload {...uploadProps} listType="picture-card" disabled>
                    <div className="file_upload">
                      <CloudUploadOutlined />
                      <br />
                      <span>Add Attachment</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </Col>
            <Col span={24}>
              <Form.Item
                name="RiskAndmMeasures"
                label="Any risk that you identified and if yes what is the mitigation measures?"
              >
                <Input.TextArea placeholder="Please input" disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Comments" label="Other comments">
                <Input.TextArea placeholder="Please input" disabled />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="F. Approver Information" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="Procurement" label="Procurement">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="FinanceController" label="Finance Controller">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="DataSecurity" label="Data Security">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Legal" label="Legal">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="SiteGM" label="Site GM">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="CountryManagerGM" label="Country Manager/GM">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="RegionalVP" label="Regional VP">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="CFO" label="CFO">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <ApprovalActions
          applicationNo={applicationNo}
          formValidataion={onSubmit}
          callBack={(result: any) => {
            setLoading(false);
            window.location.href =
              'https://serviceme.sharepoint.com/sites/DPA_DEV_Community/SitePages/DPA.aspx#/dashboard';
          }}
        ></ApprovalActions>
      </Form>
      {loading ? <Loading /> : null}
    </>
  );
};

export default index;
