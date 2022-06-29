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
interface OptionItem {
  key: number;
  Title: string;
}
const index = () => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/subcontractContract?ID=';
  const wfFlowName = '6C941EF0-0464-088B-E2EF-7022F59C1CA5';
  const listName = 'GeneralPurchase';

  const [form] = Form.useForm();
  // const spService = new SpService();
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
    form.setFieldsValue({
      ApplicationNo: getSerialNum(),
      RequestDate: moment().format('YYYY/MM/DD'),
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
    // beforeUpload: (file, fileList) => {
    //   if (!file.id) {
    //     return formService.uploadFile(file.name, file).then((res) => {
    //       // 存储文件
    //       file.id = res;
    //       return res;
    //     });
    //   }
    //   return false;
    // },
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
                <Input disabled />
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
                    label={
                      <>
                        Whether the subcontractor is an entity of BVCPS
                        <Tooltip title="Note, the CoE/BPCC declaration must be signed before or together with the contract.">
                          <InfoCircleOutlined
                            style={{ margin: '0 5px', color: 'orange' }}
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
                          <Tooltip title="A “connection” can mean the country where a) the services are performed, b) the product will be imported, c) the related client / manufacturer / ">
                            <InfoCircleOutlined
                              style={{ margin: '0 5px', color: 'orange' }}
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
                label={
                  <>
                    Please state the annual contract sum (if known) or provide
                    an estimate annual contract sum
                    <Tooltip title="The applicant can fill in either the local currency or USD">
                      <InfoCircleOutlined
                        style={{ margin: '0 5px', color: 'orange' }}
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
                name="NeededReason"
                label="Please describe why the subcontractor is needed"
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
                name="RequestService"
                label="Did a BV customer or government official request the service?"
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
                >
                  <Input.TextArea placeholder="Please input" />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item
                name="HasLicense"
                label='Whether the subcontractor has license to operate ("LTO")  required by the project?'
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="InsertLTO"
                label="Please insert the LTO of the subcontractor"
              >
                <Input placeholder="Please input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="NoLicenseReason"
                label="Please explain the reason"
              >
                <Input.TextArea placeholder="Please input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="UnethicalBehaviorRequired"
                label="Does the contracting process require unethical behavior?"
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
                name="FamilyMemberHere"
                label="Do you or your family member have any interest in the subcontractor or does your family member work for or in the subcontractor?"
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
                name="ProcessInfo"
                label="Will the subcontractor be processing personal data on behalf of BV or accessing any of BV’s Information System?"
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
                label={
                  <>
                    Whether to use a BV Mandatory template
                    <Tooltip title="In principle, BV entities shall use our standard template for subcontractor agreements.">
                      <InfoCircleOutlined
                        style={{ margin: '0 5px', color: 'orange' }}
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
              <Form.Item name="cfo" label="CFO" rules={[{ required: true }]}>
                <Input placeholder="Please input" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <div style={{ margin: '20px auto', textAlign: 'center' }}>
        <Space size={50}>
          <Button type="primary" onClick={() => {}}>
            Save
          </Button>
          <Button type="primary" onClick={() => {}}>
            Submit
          </Button>
        </Space>
      </div>
      {/* <ApprovalActions formValidataion={onSubmit}></ApprovalActions> */}
    </>
  );
};

export default index;
