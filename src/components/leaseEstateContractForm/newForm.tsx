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
import Loading from '@/components/loading/Loading';
import { CloudUploadOutlined, BellOutlined } from '@ant-design/icons';
import { getSerialNum } from '@/tools/utils';
interface OptionItem {
  key: number;
  Title: string;
}
const index = () => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/leaseEstateContract?ID=';
  const wfFlowName = '3FCF0B04-C380-0ECF-1509-B8CF153924B4';
  const listName = 'LeaseEstateContract';
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const formService = new FormService();

  //#endregion

  const onSubmit = () => {
    return form.validateFields().then((res) => {
      const params = {
        ...form.getFieldsValue(),
      };
      let _no = getSerialNum('LC');
      params.Title = _no;
      delete params.file;
      delete params.lessorFile;
      delete params.certificateFile;
      delete params.agreementFile;
      return {
        isOK: true,
        formData: params,
        formLink,
        applicationNo: _no,
        wfFlowName,
        listName,
      };
    });
  };
  const [buOptions, setBUOptions] = useState<any>([]);
  const [sbuOptions, setSBUOptions] = useState<any>([]);
  const [proOptions, setProOptions] = useState<any>([]);
  const [bvEntityOptions, setBVEntityOptions] = useState<any>([]);
  const [siteOptions, setSiteOptions] = useState([]);
  const [depositAmountOptions, setDepositAmountOptions] = useState([]);
  const [regionOptions, setRegion] = useState([]);
  const [countryOptions, setCountry] = useState([]);
  const [contractAmountOptions, setContractAmount] = useState([]);
  const [leaseTypeOptions, setLeaseTypeOptions] = useState([]);
  const [budgetApproved, setBudgetApproved] = useState<any>();
  const [contractSumWithinBudget, setContractSumWithinBudget] = useState<any>();
  const [depositAmount, setDepositAmount] = useState<any>();
  const [lessorIsOwner, setLessorIsOwner] = useState<any>();
  const [mortgage, setMortgage] = useState<any>();
  const [environmentalProtectMeet, setEnvironmentalProtectMeet] =
    useState<any>();
  const [priorityOfRenew, setPriorityOfRenew] = useState<any>();
  const [advanceNoticeClause, setAdvanceNoticeClause] = useState<any>();
  const [useMandatoryTemplate, setUseMandatoryTemplate] = useState<any>();
  const [leaseType, setLeaseType] = useState<any>();
  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    _getOps();

    form.setFieldsValue({
      Title: 'To Be Generated',
      RequestDate: moment(),
      Requester: new spService().getSpPageContextInfo().userEmail,
    });
  }, []);

  const _getOps = async () => {
    try {
      const drop1 = await formService.getTableDataAll('DepositAmount');
      setDepositAmountOptions(drop1);
      const drop2 = await formService.getTableDataAll('LeaseType');
      setLeaseTypeOptions(drop2);
      const drop3 = await formService.getTableDataAll('Site');
      setSiteOptions(drop3);
      const drop4 = await formService.getTableDataAll('Region');
      setRegion(drop4);
      const drop5 = await formService.getTableDataAll('ContractAmountScope');
      setContractAmount(drop5);
      let drop8 = await formService.getUserList();
      setUserList([...drop8.filter((item: any) => !!item.WorkEmail)]);
    } catch (error) {
      console.error(error);
    }
  };
  const uploadProps = {
    beforeUpload: (file: any, fileList: any) => {
      return false;
    },
  };
  const getCountry = (_region: string) => {
    if (!_region) {
      setCountry([]);
      setBVEntityOptions([]);
      setBUOptions([]);
      setSBUOptions([]);
      setProOptions([]);
      form.setFieldsValue({
        Country: '',
        BVSigningEntity: '',
        SBU: '',
        BU: '',
        ProductLine: '',
      });
      return;
    }
    setLoading(true);
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
        setLoading(false);
        setBVEntityOptions([]);
        setBUOptions([]);
        setSBUOptions([]);
        setProOptions([]);
        form.setFieldsValue({
          Country: '',
          BVSigningEntity: '',
          SBU: '',
          BU: '',
          ProductLine: '',
        });
        // 清空Country 、entity和sbu
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  // 去重复字段
  const _delRepeat = (originalData: any[], name: string) => {
    let temp: string[] = [];
    let targetArr = [];
    for (let i = 0; i < originalData.length; i++) {
      if (temp.indexOf(originalData[i][name]) < 0) {
        temp.push(originalData[i][name]);
        targetArr.push(originalData[i]);
      }
    }
    return targetArr;
  };
  // 通过国家获取entity
  const getEntityByCountry = (_country: string) => {
    if (!_country) {
      setBVEntityOptions([]);
      setBUOptions([]);
      setSBUOptions([]);
      setProOptions([]);
      // 清空entity和sbu
      form.setFieldsValue({
        BVSigningEntity: '',
        SBU: '',
        BU: '',
        ProductLine: '',
      });
      return;
    }
    return formService
      .getTableData(
        'BUList',
        [
          {
            type: 'filter eq',
            value: _country,
            properties: ['Countries'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('Region'),
            properties: ['Region'],
          },
        ],
        [],
      )
      .then((res) => {
        // 去重
        setBVEntityOptions(_delRepeat(res, 'EntityName'));
        setBUOptions([]);
        setSBUOptions([]);
        setProOptions([]);
        // 清空entity和sbu
        form.setFieldsValue({
          BVSigningEntity: '',
          SBU: '',
          BU: '',
          ProductLine: '',
        });
      })
      .catch((e) => {});
  };
  // 通过entity获取bu
  const getBUByEntity = (_entity: string) => {
    if (!_entity) {
      setBUOptions([]);
      setSBUOptions([]);
      setProOptions([]);
      form.setFieldsValue({
        BU: '',
        SBU: '',
        ProductLine: '',
      });
      return;
    }
    return formService
      .getTableData(
        'BUList',
        [
          {
            type: 'filter eq',
            value: _entity,
            properties: ['EntityName'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('Region'),
            properties: ['Region'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('Country'),
            properties: ['Countries'],
          },
        ],
        [],
      )
      .then((res) => {
        setBUOptions(_delRepeat(res, 'BU'));
        setSBUOptions([]);
        setProOptions([]);
        form.setFieldsValue({
          BU: '',
          SBU: '',
          ProductLine: '',
        });
      })
      .catch((e) => {});
  };
  const getSBUByBU = (_bu?: string) => {
    if (!_bu) {
      setSBUOptions([]);
      setProOptions([]);
      form.setFieldsValue({
        SBU: '',
        ProductLine: '',
      });
      return;
    }
    return formService
      .getTableData(
        'BUList',
        [
          {
            type: 'filter eq',
            value: _bu,
            properties: ['BUCode'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('Region'),
            properties: ['Region'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('Country'),
            properties: ['Countries'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('BVSigningEntity'),
            properties: ['EntityName'],
          },
        ],
        [],
      )
      .then((res) => {
        setSBUOptions(_delRepeat(res, 'SBU'));
        setProOptions([]);
        form.setFieldsValue({
          SBU: '',
          ProductLine: '',
        });
      })
      .catch((e) => {});
  };
  const getProLineBySBU = (_sbu?: string) => {
    if (!_sbu) {
      setProOptions([]);
      setProOptions([]);
      return;
    }
    return formService
      .getTableData(
        'BUList',
        [
          {
            type: 'filter eq',
            value: _sbu,
            properties: ['SBU'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('BU'),
            properties: ['BUCode'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('Region'),
            properties: ['Region'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('Country'),
            properties: ['Countries'],
          },
          {
            type: 'filter eq',
            value: form.getFieldValue('BVSigningEntity'),
            properties: ['EntityName'],
          },
        ],
        [],
      )
      .then((res) => {
        setProOptions(_delRepeat(res, 'ProductLine'));
        form.setFieldsValue({
          ProductLine: '',
        });
      })
      .catch((e) => {});
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

  const validHasMaterialChanges = (rule: any, value: any) => {
    if (useMandatoryTemplate == 1 && !value && value !== 0) {
      return Promise.reject(new Error('Please select'));
    } else {
      return Promise.resolve();
    }
  };
  const uploadFileMethods = (fieldName: string, id: string | number) => {
    let _listFile = form.getFieldValue(fieldName);
    if (!_listFile) {
      return Promise.resolve();
    }
    let res: any;
    let aryPromise: Promise<any>[] = [];
    _listFile.forEach((element: { name: string; originFileObj: File }) => {
      aryPromise.push(
        formService.uploadFile(element.name, element.originFileObj),
      );
    });
    if (!aryPromise.length) {
      return;
    }
    return Promise.all(aryPromise)
      .then((resultArr) => {
        let filesPromise: Promise<any>[] = [];
        resultArr.forEach((result1) => {
          //  上传文件，并添加id
          res = result1;
          filesPromise.push(
            formService.getFile(res.d.ListItemAllFields.__deferred.uri),
          );
        });
        return Promise.all(filesPromise)
          .then((resultMiddleArr) => {
            let resultMiddlePromise: Promise<any>[] = [];
            resultMiddleArr.forEach((resultMiddle) => {
              //  上传文件，并添加id
              resultMiddlePromise.push(
                formService.updateFileItem(resultMiddle, {
                  ProcName: listName,
                  ProcId: id,
                  FieldName: fieldName,
                  FileUrl: res.d.ServerRelativeUrl,
                }),
              );
            });

            return Promise.all(resultMiddlePromise)
              .then(() => {
                return true;
              })
              .catch((e) => {
                message.error(e);
                setLoading(false);
                return e;
              });
          })
          .catch((e) => {
            message.error(e);
            setLoading(false);
            return e;
          });
      })
      .catch((e) => {
        message.error(e);
        setLoading(false);
        return e;
      });
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
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <Select
                      placeholder="----select------"
                      allowClear
                      onChange={getCountry}
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
                    <Select
                      placeholder="----select------"
                      onChange={getEntityByCountry}
                    >
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
                    name="BVSigningEntity"
                    label="BV Signing Entity"
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <Select
                      placeholder="-----select--------"
                      onChange={getBUByEntity}
                    >
                      {bvEntityOptions.map((item: any, index: number) => (
                        <Select.Option value={item?.EntityName} key={index}>
                          {item?.EntityName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="BU"
                    label="BU"
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <Select
                      placeholder="-----select--------"
                      onChange={getSBUByBU}
                    >
                      {buOptions.map((item: any, index: number) => (
                        <Select.Option value={item?.BUCode} key={index}>
                          {item?.BUDescription}
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
                    <Select
                      placeholder="-----select--------"
                      onChange={getProLineBySBU}
                    >
                      {sbuOptions.map((item: any, index: number) => (
                        <Select.Option value={item?.SBU} key={index}>
                          {item?.SBU}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="ProductLine"
                    label="Product Line"
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <Select
                      allowClear
                      placeholder="-----select--------"
                      onChange={(val) => {
                        if (val) {
                          let _data: any = proOptions.find(
                            (item: any) => item.ProductLine == val,
                          );
                          let approvers = [
                            'CFO',
                            'DataSecurity',
                            'CountryManagerGM',
                            'Legal',
                            'Procurement',
                            'RegionalVP',
                            'FinanceController',
                            'SiteGM',
                            'HSE',
                            'HR',
                          ];
                          let newData: any = {};
                          approvers.forEach((element: any) => {
                            if (_data[element]) {
                              newData[element] = _data[element];
                            }
                          });
                          form.setFieldsValue({
                            ...newData,
                          });
                        } else {
                          form.setFieldsValue({
                            Procurement: '',
                            FinanceController: '',
                            DataSecurity: '',
                            Legal: '',
                            SiteGM: '',
                            CountryManagerGM: '',
                            RegionalVP: '',
                            HR: '',
                            HSE: '',
                          });
                        }
                      }}
                    >
                      {proOptions.map((item: any, index: number) => (
                        <Select.Option value={item?.ProductLine} key={index}>
                          {item?.ProductLine}
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
                      <Radio value={0}>New Lease</Radio>
                      <Radio value={1}>Renewal</Radio>
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
                      name="agreementFile"
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
                          validator: (rule: any, value) => {
                            if (
                              form.getFieldValue('LeaseOrRenewal') === 1 &&
                              (!value || !value.length)
                            ) {
                              return Promise.reject(new Error(rule.message));
                            } else {
                              return Promise.resolve();
                            }
                          },
                          message: 'Please upload the file',
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
                    <Select
                      placeholder="-----select--------"
                      onChange={(val) => {
                        setLeaseType(val);
                      }}
                    >
                      {leaseTypeOptions.map((item: OptionItem, index) => (
                        <Select.Option value={item?.Title} key={index}>
                          {item?.Title}
                        </Select.Option>
                      ))}
                    </Select>
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
                required={false}
                label={
                  <>
                    Is the contract sum within the approved budget
                    <span className="dot_required">*</span>{' '}
                    {getLevel(
                      contractSumWithinBudget
                        ? 'Low'
                        : contractSumWithinBudget === 0
                        ? 'High'
                        : '',
                    )}{' '}
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val) => {
                    setContractSumWithinBudget(val.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="BudgetApproved"
                label={
                  <>
                    Within the approved budget or not
                    <span className="dot_required">*</span>{' '}
                    {getLevel(
                      budgetApproved
                        ? 'Low'
                        : budgetApproved === 0
                        ? 'High'
                        : '',
                    )}{' '}
                  </>
                }
                required={false}
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val) => {
                    setBudgetApproved(val.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
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
                <Select
                  placeholder="-----select--------"
                  onChange={(val) => {
                    setDepositAmount(val);
                  }}
                >
                  {depositAmountOptions.map((item: OptionItem, index) => (
                    <Select.Option value={item?.Title} key={index}>
                      {item?.Title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {depositAmount == 'Others' ? (
              <Col span={12}>
                <Form.Item name="OthersDeposit" label="Others deposit amount">
                  <InputNumber
                    placeholder="Please input"
                    min={0}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
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
                label={
                  <>
                    Whether the lessor is the owner of the property
                    <span className="dot_required">*</span>{' '}
                    {getLevel(
                      lessorIsOwner ? 'Low' : lessorIsOwner === 0 ? 'High' : '',
                    )}{' '}
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val) => {
                    setLessorIsOwner(val.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {lessorIsOwner === 0 ? (
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
            ) : (
              ''
            )}
            <Col span={24}>
              <Form.Item
                name="Mortgage"
                required={false}
                label={
                  <>
                    Any mortgage and/or seize on the property that restricted
                    the lessor from leasing
                    <span className="dot_required">*</span>{' '}
                    {getLevel(
                      mortgage ? 'High' : lessorIsOwner === 0 ? 'Low' : '',
                    )}
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val) => {
                    setMortgage(val.target.value);
                  }}
                >
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
                label={
                  <>
                    Environmental protection, fire prevention and/or any other
                    necessary requirement of the property are met or not
                    <span className="dot_required">*</span>{' '}
                    {getLevel(
                      environmentalProtectMeet
                        ? 'Low'
                        : environmentalProtectMeet === 0
                        ? 'High'
                        : '',
                    )}{' '}
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val) => {
                    setEnvironmentalProtectMeet(val.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="PriorityOfRenew"
                label={
                  <>
                    Whether BV has the priority to renew the lease
                    {getLevel(
                      priorityOfRenew
                        ? 'Low'
                        : priorityOfRenew === 0
                        ? 'Medium'
                        : '',
                    )}{' '}
                  </>
                }
              >
                <Radio.Group
                  onChange={(val) => {
                    setPriorityOfRenew(val.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="AdvanceNoticeClause"
                label={
                  <>
                    Whether there is any provision in the lease that allows the
                    lessor to serve a prior notice to break/terminate the lease
                    term (e.g due to redevelopment reason or self-use reason)
                    and without paying any compensation
                    {getLevel(
                      advanceNoticeClause
                        ? 'High'
                        : advanceNoticeClause === 0
                        ? 'Low'
                        : '',
                    )}
                  </>
                }
              >
                <Radio.Group
                  onChange={(val) => {
                    setAdvanceNoticeClause(val.target.value);
                  }}
                >
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
                      useMandatoryTemplate === 0
                        ? 'High'
                        : useMandatoryTemplate
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
                required={useMandatoryTemplate}
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
        <Card title="E. Approver Information" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="Procurement"
                label="Procurement"
                rules={[{ required: true }]}
              >
                <Select placeholder="Please select" allowClear>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="FinanceController"
                label="Finance Controller"
                rules={[{ required: true }]}
              >
                <Select placeholder="Please select" allowClear>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="DataSecurity" label="Data Security">
                <Select placeholder="Please select" allowClear>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Legal"
                label="Legal"
                rules={[{ required: true }]}
              >
                <Select placeholder="Please select" allowClear>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="SiteGM"
                label="Site GM"
                rules={[{ required: true }]}
              >
                <Select placeholder="Please select" allowClear>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="CountryManagerGM"
                label="Country Manager/GM"
                rules={[{ required: true }]}
              >
                <Select placeholder="Please select" allowClear>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="RegionalVP"
                label="Regional VP"
                rules={[{ required: true }]}
              >
                <Select placeholder="Please select" allowClear>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {leaseType == 'Residential lease' ? (
              <>
                <Col span={12}>
                  <Form.Item
                    name="HSE"
                    label="HSE"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Please select" allowClear>
                      {userList.map((item: any, index: number) => (
                        <Select.Option value={item?.WorkEmail} key={index}>
                          {item?.WorkEmail}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="HR" label="HR" rules={[{ required: true }]}>
                    <Select placeholder="Please select" allowClear>
                      {userList.map((item: any, index: number) => (
                        <Select.Option value={item?.WorkEmail} key={index}>
                          {item?.WorkEmail}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            ) : (
              ''
            )}

            <Col span={12}>
              <Form.Item name="CFO" label="CFO" rules={[{ required: true }]}>
                <Select placeholder="Please select" allowClear>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <ApprovalActions
          formValidataion={onSubmit}
          setLoading={setLoading}
          callBack={(result: any) => {
            if (!result) {
              setLoading(false);
              return;
            }
            // 四种文件上传 file lessorFile certificateFile agreementFile
            uploadFileMethods('file', result.ID)
              ?.then((res) => {
                return uploadFileMethods('lessorFile', result.ID);
              })
              .then((res1) => {
                return uploadFileMethods('certificateFile', result.ID);
              })
              .then((res1) => {
                return uploadFileMethods('agreementFile', result.ID);
              })
              .then((res) => {
                setLoading(false);
                message.success('Operate Success!');
                window.location.href =
                  'https://serviceme.sharepoint.com/sites/DPA_DEV_Community/SitePages/DPA.aspx#/dashboard';
              })
              .catch((e) => {
                console.error(e);
                setLoading(false);
              });
          }}
        ></ApprovalActions>
      </Form>
      {loading ? <Loading /> : null}
    </>
  );
};

export default index;
