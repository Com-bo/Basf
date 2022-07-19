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
import ApprovalActions from '@/components/procOptions/procOptions';
import Loading from '@/components/loading/Loading';
import { CloudUploadOutlined, BellOutlined } from '@ant-design/icons';

const index = (props: any) => {
  //#region   固定模板
  const formLink = 'http://bv_dpa.com:8001/leaseEstateContract?ID=';
  const wfFlowName = '3FCF0B04-C380-0ECF-1509-B8CF153924B4';
  const listName = 'LeaseEstateContract';
  const [loading, setLoading] = useState(false);
  const [applicationNo, setApplicationNo] = useState('');
  const [form] = Form.useForm();
  const formService = new FormService();

  //#endregion

  const onSubmit = () => {
    return form.validateFields().then((res) => {
      // 获取审批人
      const params = {
        ...form.getFieldsValue(),
      };
      delete params.file;
      return {
        isOK: true,
        formData: params,
        formLink,
        applicationNo,
        wfFlowName,
        listName,
        setLoading,
      };
    });
  };
  const [buOptions, setBUOptions] = useState<any>([]);
  const [userList, setUserList] = useState<any>([]);
  useEffect(() => {
    // 附件之初始化获取id
    if (!props.location.query?.ID) {
      return;
    }
    setLoading(true);
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
        getBUByEntity(res[0].BVSigningEntity, res[0].Region, res[0].Country);
        return formService.getFileItems(listName, props.location.query?.ID);
      })
      .then((res) => {
        if (res && res.length) {
          form.setFieldsValue({
            file: res.filter((item: any) => item.fieldName == 'file'),
            lessorFile: res.filter(
              (item: any) => item.fieldName == 'lessorFile',
            ),
            certificateFile: res.filter(
              (item: any) => item.fieldName == 'certificateFile',
            ),
            agreementFile: res.filter(
              (item: any) => item.fieldName == 'agreementFile',
            ),
          });
        }
        return formService.getUserList();
      })
      .then((ops) => {
        setLoading(false);
        setUserList([...ops.filter((item: any) => !!item.WorkEmail)]);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

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
  const getBUByEntity = (
    _entity: string,
    _region: string,
    _country: string,
  ) => {
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
            value: _region,
            properties: ['Region'],
          },
          {
            type: 'filter eq',
            value: _country,
            properties: ['Countries'],
          },
        ],
        [],
      )
      .then((res) => {
        setBUOptions(_delRepeat(res, 'BU'));
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
                  <Form.Item name="Region" label="Region">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Country" label="Country">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="BVSigningEntity" label="BV Signing Entity">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="BU" label="BU">
                    <Select placeholder="-----select--------" disabled>
                      {buOptions.map((item: any, index: number) => (
                        <Select.Option value={item?.BUCode} key={index}>
                          {item?.BUDescription}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="SBU" label="SBU">
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="ProductLine" label="Product Line">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Site" label="Site">
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
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="SupplierCode"
                    label="Please upload the supplier code"
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="BPCCSigned"
                    label="BPCC declaration signed or not"
                  >
                    <Radio.Group disabled>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="LeaseYear" label="Term of Lease (year)">
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="LeaseOrRenewal" label="New lease or renewal">
                    <Radio.Group disabled>
                      <Radio value={0}>New Lease</Radio>
                      <Radio value={1}>Renewal</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="LeaseArea" label="Lease Area">
                    <Input disabled />
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
                    >
                      <Upload listType="picture-card" disabled>
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
                  <Form.Item name="LeaseType" label="Type of lease">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
        <Card title="B.Contract Amount and Payment" bordered={false}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item name="MonthLyAmount" label="Monthly rental amount">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="PaymentTerm" label="Payment term">
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
                label={
                  <>
                    Is the contract sum within the approved budget
                    {getLevel(
                      form.getFieldValue('ContractSumWithinBudget')
                        ? 'Low'
                        : form.getFieldValue('ContractSumWithinBudget') === 0
                        ? 'High'
                        : '',
                    )}{' '}
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
                name="BudgetApproved"
                label={
                  <>
                    Within the approved budget or not
                    {getLevel(
                      form.getFieldValue('BudgetApproved')
                        ? 'Low'
                        : form.getFieldValue('BudgetApproved') === 0
                        ? 'High'
                        : '',
                    )}{' '}
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
                name="MgmtFee"
                label="Property management fee actual amount"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="DepositAmount" label="Deposit actual amount">
                <Input disabled />
              </Form.Item>
            </Col>
            {form.getFieldValue('DepositAmount') == 'Others' ? (
              <Col span={12}>
                <Form.Item name="OthersDeposit" label="Others deposit amount">
                  <Input disabled />
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
                name="LessorIsOwner"
                label={
                  <>
                    Whether the lessor is the owner of the property
                    {getLevel(
                      form.getFieldValue('LessorIsOwner')
                        ? 'Low'
                        : form.getFieldValue('LessorIsOwner') === 0
                        ? 'High'
                        : '',
                    )}{' '}
                  </>
                }
              >
                <Radio.Group disabled>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {form.getFieldValue('LessorIsOwner') === 0 ? (
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
            ) : (
              ''
            )}
            <Col span={24}>
              <Form.Item
                name="Mortgage"
                label={
                  <>
                    Any mortgage and/or seize on the property that restricted
                    the lessor from leasing
                    {getLevel(
                      form.getFieldValue('Mortgage')
                        ? 'High'
                        : form.getFieldValue('Mortgage') === 0
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
            <Col span={24}>
              <Form.Item
                name="UsePropertyRecord"
                label="Use of property recorded in the certificate of property ownership"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="EnvironmentalProtectMeet"
                label={
                  <>
                    Environmental protection, fire prevention and/or any other
                    necessary requirement of the property are met or not
                    {getLevel(
                      form.getFieldValue('EnvironmentalProtectMeet')
                        ? 'Low'
                        : form.getFieldValue('EnvironmentalProtectMeet') === 0
                        ? 'High'
                        : '',
                    )}{' '}
                  </>
                }
              >
                <Radio.Group disabled>
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
                      form.getFieldValue('PriorityOfRenew')
                        ? 'Low'
                        : form.getFieldValue('PriorityOfRenew') === 0
                        ? 'Medium'
                        : '',
                    )}{' '}
                  </>
                }
              >
                <Radio.Group disabled>
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
                      form.getFieldValue('AdvanceNoticeClause')
                        ? 'High'
                        : form.getFieldValue('AdvanceNoticeClause') === 0
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
                        : form.getFieldValue('UseMandatoryTemplate')
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
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Contract Attachment is required',
                  //   },
                  // ]}
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
        <Card title="E. Approver Information" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="Procurement" label="Procurement">
                <Select placeholder="Please select" allowClear disabled>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="FinanceController" label="Finance Controller">
                <Select placeholder="Please select" allowClear disabled>
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
                <Select placeholder="Please select" allowClear disabled>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Legal" label="Legal">
                <Select placeholder="Please select" allowClear disabled>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="SiteGM" label="Site GM">
                <Select placeholder="Please select" allowClear disabled>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="CountryManagerGM" label="Country Manager/GM">
                <Select placeholder="Please select" allowClear disabled>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="RegionalVP" label="Regional VP">
                <Select placeholder="Please select" allowClear disabled>
                  {userList.map((item: any, index: number) => (
                    <Select.Option value={item?.WorkEmail} key={index}>
                      {item?.WorkEmail}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {form.getFieldValue('LeaseType') == 'Residential lease' ? (
              <>
                <Col span={12}>
                  <Form.Item name="HSE" label="HSE">
                    <Select placeholder="Please select" allowClear disabled>
                      {userList.map((item: any, index: number) => (
                        <Select.Option value={item?.WorkEmail} key={index}>
                          {item?.WorkEmail}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="HR" label="HR">
                    <Select placeholder="Please select" allowClear disabled>
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
              <Form.Item name="CFO" label="CFO">
                <Select placeholder="Please select" allowClear disabled>
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
          keyId={props.location.query?.Key}
          formValidataion={onSubmit}
          setLoading={setLoading}
          applicationNo={applicationNo}
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
