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
  Tooltip,
} from 'antd';
import FormService from '@/services/form.service';
import moment from 'moment';
import ApprovalActions from '@/components/procOptions/procOptions';
import { CloudUploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { formatStrategyValues } from 'rc-tree-select/lib/utils/strategyUtil';
import { getapplicationNo } from '@/tools/utils';
interface OptionItem {
  key: number;
  Title: string;
}
const index = () => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/subcontractContract?ID=';
  const wfFlowName = '6C941EF0-0464-088B-E2EF-7022F59C1CA5';
  const listName = 'SubContractContract';

  const [form] = Form.useForm();
  // const spService = new SpService();
  const formService = new FormService();

  //获取流水号
  const getSerialNum = () => {
    getapplicationNo(listName, formService).then((res) => {
      form.setFieldsValue({
        ApplicationNo: res,
      });
    });
  };

  //#endregion

  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const onSubmit = () => {
    return form.validateFields().then((res) => {
      const params = {
        ...form.getFieldsValue(),
      };
      delete params.file;
      return {
        isOK: true,
        formData: params,
        formLink,
        wfFlowName,
        listName,
      };
    });
  };

  const [sBUOptions, setSBUOptions] = useState([]);
  const [bvEntityOptions, setBVEntityOptions] = useState([]);
  const [siteOptions, setSiteOptions] = useState([]);
  const [regionOptions, setRegion] = useState([]);
  const [countryOptions, setCountry] = useState([]);
  const [contractAmountOptions, setContractAmount] = useState([]);
  const [paymentTermsOptions, setPaymentTerms] = useState([]);
  const [hideLocatedInCountryListed, setHideLocatedInCountryListed] =
    useState(true);
  const [hideProposedServicesConnection, setHideProposedServicesConnection] =
    useState(true);
  const [contractTermsOptions, setContractTerms] = useState([]);
  const [hideTermExplainReason, setHideTermExplainReason] = useState(true);
  const [hideBackground, setHideBackground] = useState(true);
  const [hasLicense, setHasLicense] = useState(null);
  useEffect(() => {
    // 附件之初始化
    // formService.getFileItems().then((res) => {
    //   if (res && res.length) {
    //     form.setFieldsValue({
    //       file: res,
    //     });
    //   }
    // });
    // 获取下拉options
    _getOps();
    getSerialNum();
    form.setFieldsValue({
      RequestDate: moment(),
    });
  }, []);
  const getCountry = (_region: string) => {
    return formService
      .getTableData(
        'Country',
        [
          {
            type: 'filter eq',
            value: _region,
            properties: ['Region'],
          },
        ],
        [],
      )
      .then((res) => {
        setCountry(res);
      })
      .catch((e) => {});
  };

  const _getOps = async () => {
    try {
      const drop1 = await formService.getTableDataAll('SBU');
      setSBUOptions(drop1);
      const drop2 = await formService.getTableDataAll('BVSigningEntity');
      setBVEntityOptions(drop2);
      const drop3 = await formService.getTableDataAll('Site');
      setSiteOptions(drop3);
      const drop4 = await formService.getTableDataAll('Region');
      setRegion(drop4);
      const drop5 = await formService.getTableDataAll('ContractAmountScope');
      setContractAmount(drop5);
      const drop6 = await formService.getTableDataAll('PaymentTerm');
      setPaymentTerms(drop6);
      const drop7 = await formService.getTableDataAll(
        'SubcontractorContractTerms',
      );
      setContractTerms(drop7);
    } catch (error) {}
  };
  const uploadProps = {
    // onRemove: (file, fileList) => {
    //   if (file.id) {
    //     return formService.deleteFileItem(file.name);
    //   }
    // },
    beforeUpload: (file, fileList) => {
      // if (!file.id) {
      //   return formService.uploadFile(file.name, file).then((res) => {
      //     // 存储文件
      //     file.id = res;
      //     return res;
      //   });
      // }
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
  const onValuesChange = ({
    EntityOfBVCPS,
    LocatedInCountryListed,
  }: {
    EntityOfBVCPS: number;
    LocatedInCountryListed: number;
  }) => {
    if (EntityOfBVCPS === 0) {
      setHideLocatedInCountryListed(false);
    } else if (EntityOfBVCPS === 1) {
      setHideLocatedInCountryListed(true);
    }
    if (LocatedInCountryListed === 0) {
      setHideProposedServicesConnection(false);
    } else if (LocatedInCountryListed === 1) {
      setHideProposedServicesConnection(true);
    }
  };
  const requiredOtherPaymentTerm = () => {
    if (form.getFieldValue('paymentTerm') == 'others') {
      return Promise.reject(new Error('Please enter details'));
    } else {
      return Promise.resolve();
    }
  };
  const validHasMaterialChanges = (rule: any, value: any) => {
    if (
      form.getFieldValue('UseMandatoryTemplate') == 1 &&
      value === undefined
    ) {
      return Promise.reject(new Error('Please select'));
    } else {
      return Promise.resolve();
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="subcontractContractForm"
        onValuesChange={onValuesChange}
      >
        <Card title="A. General Information" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="ApplicationNo" label="Application No.">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="RequestDate" label="Request Date">
                <DatePicker format="YYYY/MM/DD" disabled />
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
                    <Select
                      placeholder="----select------"
                      allowClear
                      onChange={(val) => {
                        if (val) {
                          getCountry(val);
                        } else {
                          setCountry([]);
                        }
                      }}
                    >
                      {regionOptions.map((item: OptionItem, index) => (
                        <Select.Option value={item?.Title} key={index}>
                          {item?.Title}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Country"
                    label="Country"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="----select------">
                      {countryOptions.map((item: OptionItem, index) => (
                        <Select.Option value={item?.Title} key={index}>
                          {item?.Title}
                        </Select.Option>
                      ))}
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
                      {sBUOptions.map((item: OptionItem, index) => (
                        <Select.Option value={item?.Title} key={index}>
                          {item?.Title}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="BVSigningEntity"
                    label="BV Signing Entity"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="-----select--------">
                      {bvEntityOptions.map((item: OptionItem, index) => (
                        <Select.Option value={item?.Title} key={index}>
                          {item?.Title}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Site"
                    label="Site"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="-----select--------">
                      {siteOptions.map((item: OptionItem, index) => (
                        <Select.Option value={item?.Title} key={index}>
                          {item?.Title}
                        </Select.Option>
                      ))}
                    </Select>
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
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="SupplierCode"
                    label="Please upload the supplier code"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="CoEOrBPCCSigned"
                    label="CoE / BPCC declaration signed or not"
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
                    name="EntityOfBVCPS"
                    required={false}
                    label={
                      <>
                        Whether the subcontractor is an entity of BVCPS
                        <span className="dot_required">*</span>
                        <Tooltip
                          trigger="click"
                          title="Note, the CoE/BPCC declaration must be signed before or together with the contract."
                        >
                          <InfoCircleOutlined
                            style={{
                              margin: '0 5px',
                              color: 'orange',
                              cursor: 'pointer',
                            }}
                          />
                        </Tooltip>
                      </>
                    }
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {!hideLocatedInCountryListed ? (
                  <Col span={24}>
                    <Form.Item
                      name="LocatedInCountryListed"
                      label="Whether the subcontractor is located in a country listed under BV Sanctions policy"
                      rules={[{ required: true }]}
                    >
                      <Radio.Group>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                ) : (
                  ''
                )}
                {hideProposedServicesConnection ? (
                  ''
                ) : (
                  <Col span={24}>
                    <Form.Item
                      name="ProposedServicesConnection"
                      label={
                        <>
                          Whether the proposed services provided by the
                          subcontractor will have any connection to any country
                          listed under BV Sanctions policy
                          <Tooltip
                            trigger="click"
                            title="A “connection” can mean the country where a) the services are performed, b) the product will be imported, c) the related client / manufacturer / "
                          >
                            <InfoCircleOutlined
                              style={{
                                margin: '0 5px',
                                color: 'orange',
                                cursor: 'pointer',
                              }}
                            />
                          </Tooltip>
                        </>
                      }
                      rules={[{ required: true }]}
                    >
                      <Radio.Group>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
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
                <Select placeholder="-----select--------">
                  {contractAmountOptions.map((item: OptionItem, index) => (
                    <Select.Option value={item?.Title} key={index}>
                      {item?.Title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="AnnualContractSum"
                required={false}
                label={
                  <>
                    Please state the annual contract sum (if known) or provide
                    an estimate annual contract sum
                    <span className="dot_required">*</span>
                    <Tooltip
                      trigger="click"
                      title="The applicant can fill in either the local currency or USD"
                    >
                      <InfoCircleOutlined
                        style={{
                          margin: '0 5px',
                          color: 'orange',
                          cursor: 'pointer',
                        }}
                      />
                    </Tooltip>
                  </>
                }
                rules={[{ required: true }]}
              >
                <Input placeholder="Please input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="BudgetApproved"
                label="If the budget has been approved"
                rules={[{ required: true }]}
              >
                <Radio.Group>
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
                name="PaymentTerm"
                label="Please summarize the payment term"
              >
                <Select placeholder="-----select--------">
                  {paymentTermsOptions.map((item: OptionItem, index) => (
                    <Select.Option value={item?.Title} key={index}>
                      {item?.Title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="OthersPaymentTerm"
                label="Please provide the others payment term"
                rules={[{ validator: requiredOtherPaymentTerm }]}
              >
                <Input placeholder="Please input" />
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
                    <span className="dot_required">*</span>{' '}
                    {getLevel(
                      form.getFieldValue('NeededReason') !== 'Others'
                        ? 'Low'
                        : '',
                    )}{' '}
                  </>
                }
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="-----select--------"
                  onChange={(val) => {
                    if (val == 'Others') {
                      setHideTermExplainReason(false);
                    } else {
                      setHideTermExplainReason(true);
                    }
                  }}
                >
                  {contractTermsOptions.map((item: OptionItem, index) => (
                    <Select.Option value={item?.Title} key={index}>
                      {item?.Title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {hideTermExplainReason ? (
              ''
            ) : (
              <Col span={24}>
                <Form.Item
                  name="NeededReasonExplain"
                  label="Please explain the reason"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea placeholder="Please input" />
                </Form.Item>
              </Col>
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
                        : 'Low',
                    )}
                  </>
                }
                rules={[{ required: true }]}
              >
                <Radio.Group
                  onChange={(val) => {
                    if (val.target.value === 1) {
                      setHideBackground(false);
                    } else {
                      setHideBackground(true);
                    }
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {hideBackground ? (
              ''
            ) : (
              <Col span={24}>
                <Form.Item
                  name="Background"
                  label="Please provide the background"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea placeholder="Please input" />
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
                      form.getFieldValue('HasLicense') == 1 ? 'High' : 'Low',
                    )}
                  </>
                }
              >
                <Radio.Group
                  onChange={(e) => {
                    setHasLicense(e.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {hasLicense == 1 ? (
              <Col span={12}>
                <Form.Item
                  name="InsertLTO"
                  label="Please insert the LTO of the subcontractor"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Please input" />
                </Form.Item>
              </Col>
            ) : hasLicense === 0 ? (
              <Col span={24}>
                <Form.Item
                  name="NoLicenseReason"
                  label="Please explain the reason"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea placeholder="Please input" />
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
                        : 'Low',
                    )}
                  </>
                }
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
                          : 'Low',
                      )}
                    </span>
                  </>
                }
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
                <Radio.Group>
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
                <Input placeholder="Please input" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="D.Others" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="UseMandatoryTemplate"
                required={false}
                label={
                  <>
                    Whether to use a BV Mandatory template
                    <span className="dot_required">*</span>
                    <Tooltip
                      trigger="click"
                      title="In principle, BV entities shall use our standard template for subcontractor agreements."
                    >
                      <InfoCircleOutlined
                        style={{
                          margin: '0 5px',
                          color: 'orange',
                          cursor: 'pointer',
                        }}
                      />
                    </Tooltip>
                    {getLevel(
                      form.getFieldValue('UseMandatoryTemplate') == 0
                        ? 'High'
                        : 'Low',
                    )}
                  </>
                }
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
                name="HasMaterialChanges"
                label="Whether there is any material changes to any term of the agreement"
                rules={[{ validator: validHasMaterialChanges }]}
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
                <Input.TextArea placeholder="Please input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Comments" label="Other comments">
                <Input.TextArea placeholder="Please input" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* <div style={{ margin: '20px auto', textAlign: 'center' }}>
        <Space size={50}>
          <Button type="primary" onClick={() => {
            form.validateFields().then(res => {
              formService.submitBizForm(
               listName,
                res.formData,
                res.formLink,
                true,
              );
           
            })
          }}>
            Save
          </Button>
          <Button type="primary" onClick={() => { }}>
            Submit
          </Button>
        </Space>
      </div> */}
        <ApprovalActions
          formValidataion={onSubmit}
          callBack={(result: any) => {
            console.log('提交');
          }}
          approvalRender={
            <Card title="F. Approver Information" bordered={false}>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    name="procurement"
                    label="Procurement"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="financeController"
                    label="Finance Controller"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dataSecurity"
                    label="Data Security"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="legal"
                    label="Legal"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="siteGM"
                    label="Site GM"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="countryManagerGM"
                    label="Country Manager/GM"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="regionalVP"
                    label="Regional VP"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cfo"
                    label="CFO"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          }
        ></ApprovalActions>
      </Form>
    </>
  );
};

export default index;
