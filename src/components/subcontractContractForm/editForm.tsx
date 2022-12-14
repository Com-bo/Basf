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
} from 'antd';
import FormService from '@/services/form.service';
import moment from 'moment';
import spService from '@/services/sharepoint.service';
import ApprovalActions from '@/components/procOptions/procOptions';

import { CloudUploadOutlined, BellOutlined } from '@ant-design/icons';
import Loading from '@/components/loading/Loading';
import { getSerialNum } from '@/tools/utils';

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
  const [loading, setLoading] = useState(false);
  const [approveData, setApproveData] = useState<any>({});
  const [form] = Form.useForm();
  const formService = new FormService();

  //获取流水号

  //#endregion
  const onSubmit = (validation?: boolean) => {
    const params = {
      ...form.getFieldsValue(),
    };
    // 审批人封装
    delete params.file;
    if (validation) {
      return form
        .validateFields()
        .then((res) => {
          return {
            isOK: true,
            formData: params,
            formLink,
            applicationNo,
            wfFlowName,
            listName,
            setLoading,
          };
        })
        .catch((e) => e);
    } else {
      return Promise.resolve({
        isOK: true,
        formData: params,
        formLink,
        wfFlowName,
        listName,
        setLoading,
      });
    }
  };

  const [buOptions, setBUOptions] = useState<any>([]);
  const [sbuOptions, setSBUOptions] = useState<any>([]);
  const [proOptions, setProOptions] = useState<any>([]);
  const [bvEntityOptions, setBVEntityOptions] = useState<any>([]);
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
  const [neededReason, setNeededReason] = useState<any>();
  const [requestService, setRequestService] = useState<any>();
  const [hasLicense, setHasLicense] = useState(null);
  const [familyMemberHere, setFamilyMemberHere] = useState(null);
  const [unethicalBehaviorRequired, setUnethicalBehaviorRequired] =
    useState(null);
  const [UseMandatoryTemplate, setUseMandatoryTemplate] = useState<any>();
  const [userList, setUserList] = useState<any>([]);
  const [processInfo, setProcessInfo] = useState<any>();

  useEffect(() => {
    // 附件之初始化获取id
    if (!props.location.query?.ID) {
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
        _getOps();
      })
      .catch((e) => console.error(e));
  }, []);
  const getCountry = (_region: string) => {
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
    setLoading(true);
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
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
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
    setLoading(true);
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
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
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
    setLoading(true);
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
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const getProLineBySBU = (_sbu?: string) => {
    if (!_sbu) {
      setProOptions([]);
      setProOptions([]);
      return;
    }
    setLoading(true);
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
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const _getOps = async () => {
    setLoading(true);
    try {
      // const drop1 = await formService.getTableDataAll('SBU');
      // setSBUOptions(drop1);
      // const drop2 = await formService.getTableDataAll('BVSigningEntity');
      // setBVEntityOptions(drop2);
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
      let drop8 = await formService.getUserList();
      setUserList([...drop8.filter((item: any) => !!item.WorkEmail)]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
  const requiredOtherPaymentTerm = (rule: any, value: any) => {
    if (form.getFieldValue('PaymentTerm') == 'others' && !value) {
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
                    <Select
                      placeholder="----select------"
                      onChange={(val) => {
                        if (val) {
                          getEntityByCountry(val);
                        } else {
                          setBVEntityOptions([]);
                        }
                      }}
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
                      onChange={(val) => {
                        if (val) {
                          getBUByEntity(val);
                        } else {
                          setBUOptions([]);
                        }
                      }}
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
                    label="BU Code"
                    // rules={[{ required: true, message: 'Please select' }]}
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
                    name="CoEOrBPCCSigned"
                    label="CoE / BPCC declaration signed or not"
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
                    name="EntityOfBVCPS"
                    required={false}
                    label={
                      <>
                        Whether the subcontractor is an entity of BVCPS
                        <span className="dot_required">*</span>
                        <Tooltip title="Note, the CoE/BPCC declaration must be signed before or together with the contract.">
                          <BellOutlined />
                        </Tooltip>
                      </>
                    }
                    rules={[{ required: true, message: 'Please select' }]}
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
                      rules={[{ required: true, message: 'Please select' }]}
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
                {hideProposedServicesConnection ||
                hideLocatedInCountryListed ? (
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
                          <Tooltip title="A “connection” can mean the country where a) the services are performed, b) the product will be imported, c) the related client / manufacturer / factory / importer / exporter is incorporated or located, d) the subcontractor used is incorporated or located, or e) any other significant connection">
                            <BellOutlined />
                          </Tooltip>
                        </>
                      }
                      rules={[{ required: true, message: 'Please select' }]}
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
                rules={[{ required: true, message: 'Please select' }]}
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
                    <Tooltip title="The applicant can fill in either the local currency or USD">
                      <BellOutlined />
                    </Tooltip>
                  </>
                }
                rules={[{ required: true, message: 'Please input' }]}
              >
                <Input placeholder="Please input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="BudgetApproved"
                label="If the budget has been approved"
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
                      neededReason == 'Others'
                        ? 'High'
                        : neededReason
                        ? 'Low'
                        : '',
                    )}{' '}
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Select
                  placeholder="-----select--------"
                  onChange={(val) => {
                    setNeededReason(val);
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
            {neededReason == 'Others' ? (
              <Col span={24}>
                <Form.Item
                  name="NeededReasonExplain"
                  label="Please explain the reason"
                  rules={[{ required: true, message: 'Please input' }]}
                >
                  <Input.TextArea placeholder="Please input" />
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
            <Col span={24}>
              <Form.Item
                required={false}
                name="RequestService"
                label={
                  <>
                    Did a BV customer or government official request the
                    service?<span className="dot_required">*</span>
                    {getLevel(
                      requestService === 1
                        ? 'High'
                        : requestService === 0
                        ? 'Low'
                        : '',
                    )}
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val) => {
                    setRequestService(val.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {requestService === 1 ? (
              <Col span={24}>
                <Form.Item
                  name="Background"
                  label="Please provide the background"
                  rules={[{ required: true, message: 'Please input' }]}
                >
                  <Input.TextArea placeholder="Please input" />
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
            <Col span={24}>
              <Form.Item
                name="HasLicense"
                required={false}
                rules={[{ required: true, message: 'Please select' }]}
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
              <Col span={24}>
                <Form.Item
                  name="InsertLTO"
                  label="Please insert the LTO of the subcontractor"
                  rules={[{ required: true, message: 'Please input' }]}
                >
                  <Input placeholder="Please input" />
                </Form.Item>
              </Col>
            ) : hasLicense === 0 ? (
              <Col span={24}>
                <Form.Item
                  name="NoLicenseReason"
                  label="Please explain the reason"
                  rules={[{ required: true, message: 'Please input' }]}
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
                        : form.getFieldValue('UnethicalBehaviorRequired') === 0
                        ? 'Low'
                        : '',
                    )}
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val: any) => {
                    setUnethicalBehaviorRequired(val);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
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
                        familyMemberHere == 1
                          ? 'High'
                          : familyMemberHere === 0
                          ? 'Low'
                          : '',
                      )}
                    </span>
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val: any) => {
                    setFamilyMemberHere(val.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
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
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val) => {
                    setProcessInfo(val.target.value);
                  }}
                >
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
                    <Tooltip title="In principle, BV entities shall use our standard template for subcontractor agreements.">
                      <BellOutlined />
                    </Tooltip>
                    {getLevel(
                      UseMandatoryTemplate === 0
                        ? 'High'
                        : UseMandatoryTemplate === 1
                        ? 'Low'
                        : '',
                    )}
                  </>
                }
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Radio.Group
                  onChange={(val: any) => {
                    setUseMandatoryTemplate(val.target.value);
                  }}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {UseMandatoryTemplate == 1 ? (
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
            ) : (
              ''
            )}
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
                rules={[{ required: true, message: 'Please select' }]}
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
            {processInfo ? (
              <Col span={12}>
                <Form.Item
                  name="DataSecurity"
                  label="Data Security"
                  rules={[{ required: true, message: 'Please select' }]}
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
            ) : (
              ''
            )}

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
          applicationNo={applicationNo}
          callBack={(result: any) => {
            if (!result) {
              setLoading(false);
              return;
            }
            uploadFileMethods('file', result.ID)
              ?.then(() => {
                setLoading(false);
                message.success('Operate Success!');
                window.location.href =
                  'https://serviceme.sharepoint.com/sites/DPA_DEV_Community/SitePages/DPA.aspx#/dashboard';
              })
              .catch((e) => {
                message.error(e);
                setLoading(false);
              });
            // formService.uploadFile()
          }}
        ></ApprovalActions>
      </Form>
      {loading ? <Loading /> : null}
    </>
  );
};

export default index;
