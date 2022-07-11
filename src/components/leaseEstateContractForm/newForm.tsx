import { useState, useEffect } from 'react';

import './index.less';
import {
  Form,
  Input,
  Select,
  Card,
  Row,
  Col,
  Radio,
  Upload,
  message,
  DatePicker,
  Tooltip,
  InputNumber,
} from 'antd';
import FormService from '@/services/form.service';
import moment from 'moment';
import spService from '@/services/sharepoint.service';
import ApprovalActions from '@/components/procOptions/procOptions';
import { CloudUploadOutlined, BellOutlined } from '@ant-design/icons';
interface OptionItem {
  key: number;
  Title: string;
}
const index = () => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/leaseEstateContract?ID=';
  const wfFlowName = '3FCF0B04-C380-0ECF-1509-B8CF153924B4';
  const listName = 'LeaseEstateContract';
  const [applicationNo, setApplicationNo] = useState('');

  const [form] = Form.useForm();
  const formService = new FormService();

  //获取流水号
  const getSerialNum = () => {
    return 'SN' + moment(new Date(), 'YYYYMMDDHHmmss');
  };

  //#endregion

  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const onSubmit = () => {
    return form.validateFields().then((res) => {
      const params = {
        ...form.getFieldsValue(),
      };
      params.Title = getSerialNum();
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
  const [familyMemberHere, setFamilyMemberHere] = useState(null);
  const [unethicalBehaviorRequired, setUnethicalBehaviorRequired] =
    useState(null);
  const [UseMandatoryTemplate, setUseMandatoryTemplate] = useState<any>();
  useEffect(() => {
    _getOps();

    form.setFieldsValue({
      ApplicationNo: 'To Be Generated',
      RequestDate: moment(),
      Requester: new spService().getSpPageContextInfo().userEmail,
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
                    rules={[{ required: true, message: 'Please select' }]}
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
                    rules={[{ required: true, message: 'Please select' }]}
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
                    rules={[{ required: true, message: 'Please select' }]}
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
                    rules={[{ required: true, message: 'Please select' }]}
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
                    rules={[{ required: true, message: 'Please select' }]}
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
                    rules={[{ required: true, message: 'Please input' }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="SupplierCode"
                    label="Please upload the supplier code"
                    rules={[{ required: true, message: 'Please input' }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="BPCCSigned"
                    label="BPCC declaration signed or not"
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="LeaseYear"
                    label="Term of Lease (year)"
                    rules={[{ required: true, message: 'Please input' }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="LeaseOrRenewal"
                    label="New lease or renewal"
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="LeaseArea"
                    label="Lease Area"
                    rules={[{ required: true, message: 'Please input' }]}
                  >
                    <Input placeholder="Please input" />
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
                      label="Please upload the last lease agreement if it is a  renewa"
                      rules={[
                        {
                          required: true,
                          message: 'Please upload the last lease agreement',
                        },
                      ]}
                    >
                      <Upload {...uploadProps} listType="picture-card">
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
                    name="LeaseType"
                    label="Type of lease"
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <Select placeholder="Please select"></Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
        <Card title="B.Contract Amount and Payment" bordered={false}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="MonthLyAmount"
                label="Monthly rental amount"
                rules={[{ required: true, message: 'Please input' }]}
              >
                <Input placeholder="Please input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="PaymentTerm"
                required={false}
                label="Payment term"
                rules={[{ required: true, message: 'Please select' }]}
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
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="BudgetApproved"
                label="Within the approved budget or not"
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group>
                  <Radio value={1}>Monthly</Radio>
                  <Radio value={0}>Quarterly</Radio>
                  <Radio value={-1}>6 months or others</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="MgmtFee"
                label="Property management fee actual amount"
              >
                <Input placeholder="Please input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="DepositAmount" label="Deposit actual amount">
                <Select></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="OthersDeposit" label="Others deposit amount">
                <InputNumber
                  placeholder="Please input"
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="C. Property Information" bordered={false}>
          <Row gutter={20}>
            <Col span={24}>
              <div className="fileWrapper">
                <Form.Item
                  name="certificateFile"
                  valuePropName="fileList"
                  getValueFromEvent={(e: any) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  }}
                  label="Please upload the certificate of property ownership"
                  rules={[
                    {
                      required: true,
                      message:
                        'The certificate of property ownership is required',
                    },
                  ]}
                >
                  <Upload {...uploadProps} listType="picture-card">
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
                required={false}
                name="LessorIsOwner"
                label="Whether the lessor is the owner of the property"
                rules={[{ required: true, message: 'Please select' }]}
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
                  name="lessorFile"
                  valuePropName="fileList"
                  getValueFromEvent={(e: any) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  }}
                  label="Please upload the documents to demonstrate the lessor has the right to rent, such as lease contract and power of attorney"
                  rules={[{ required: true, message: 'file is required' }]}
                >
                  <Upload {...uploadProps} listType="picture-card">
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
                name="Mortgage"
                label="Any mortgage and/or seize on the property that restricted the lessor from leasing"
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="UsePropertyRecord"
                label="Use of property recorded in the certificate of property ownership"
              >
                <Input placeholder="Please input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                required={false}
                name="EnvironmentalProtectMeet"
                label="Environmental protection, fire prevention and/or any other necessary requirement of the property are met or not "
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="PriorityOfRenew"
                label="Whether BV has the priority to renew the lease"
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="AdvanceNoticeClause"
                required={false}
                label="Whether there is any provision in the lease that allows the lessor to serve a prior notice to break/terminate the lease term (e.g due to redevelopment reason or self-use reason) and without paying any compensation"
              >
                <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
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
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val: any) => {
                    setUseMandatoryTemplate(val);
                  }}
                >
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
                  rules={[
                    {
                      required: true,
                      message: 'Contract Attachment is required',
                    },
                  ]}
                >
                  <Upload {...uploadProps} listType="picture-card">
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
        <ApprovalActions
          formValidataion={onSubmit}
          callBack={(result: any) => {
            let _listFile = form.getFieldValue('file');
            let res: any;
            formService
              .uploadFile(_listFile[0].name, _listFile[0].originFileObj)
              .then((result1) => {
                //  上传文件，并添加id
                res = result1;
                //   存储文件
                return formService.getFile(
                  res.d.ListItemAllFields.__deferred.uri,
                );
              })
              .then((resultMiddle) => {
                return formService.updateFileItem(resultMiddle, {
                  ProcName: listName,
                  ProcId: result.ID,
                });
              })
              .then((result) => {
                message.success('Operate Success!');
              })
              .catch((e) => {
                message.error(e);
              });
            // formService.uploadFile()
          }}
          approvalRender={
            <Card title="F. Approver Information" bordered={false}>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    name="Procurement"
                    label="Procurement"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="FinanceController"
                    label="Finance Controller"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="DataSecurity"
                    label="Data Security"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Legal"
                    label="Legal"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="SiteGM"
                    label="Site GM"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="CountryManagerGM"
                    label="Country Manager/GM"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="RegionalVP"
                    label="Regional VP"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="CFO"
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
