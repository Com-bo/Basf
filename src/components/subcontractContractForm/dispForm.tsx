import React, { useState, useEffect } from 'react';
import styles from './index.less';
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
  Upload,
} from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
const { Option } = Select;
import ApprovalActions from '@/components/procOptions/procOptions';
const index = (props: any) => {
  //#region   固定模板
  const formLink = 'http://localhost:8001/generalPurchaseForm?ID=';
  const wfFlowName = '4c8d42ce-89f7-4f0a-b8a5-962c08e510c9';
  const listName = 'GeneralPurchase';
  const [buttons, setButtons] = useState([]);
  const [taskInfo, setTaskInfo] = useState<any>({});
  const [bizInfo, setBizInfo] = useState<any>({});
  const [form] = Form.useForm();

  const spService = new SpService();

  // useEffect(() => {
  //   spService
  //     .getTableData(
  //       listName,
  //       [
  //         {
  //           type: 'filter eq',
  //           value: props?.location?.query?.ID,
  //           properties: ['Id'],
  //         },
  //       ],
  //       [],
  //     )
  //     .then((res) => {
  //       setBizInfo(res[0]);
  //       form.setFieldsValue(res[0]);
  //       getButtons(res[0].Title);
  //     });
  // }, [props]);

  // const getButtons = (title: string) => {
  //   if (!props?.location?.query?.Btn) {
  //     return '';
  //   }
  //   spService.getWorkflowTaskInfo(title).then((res) => {
  //     setTaskInfo(res[0]);
  //     console.log(res[0]);
  //     setButtons(JSON.parse(res[0].ResponseOptions));
  //   });
  // };

  const onSubmit = () => {
    return Promise.resolve({
      isOk: true,
      formData: form.getFieldsValue(),
      formLink,
      wfFlowName,
      listName,
    });
  };

  //#endregion

  return (
    <>
      <Form form={form}>
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
                <Select placeholder="-----select--------" disabled>
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="SBU" label="SBU" rules={[{ required: true }]}>
                <Select placeholder="-----select--------" disabled>
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="site" label="Site" rules={[{ required: true }]}>
                <Select placeholder="-----select--------" disabled>
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
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="PleaseUploadTheSupplierCode"
                label="Please Upload The Supplier Code"
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="IfBPCCHasBeenSigned"
                label="If BPCC Has Been Signed"
                rules={[{ required: true }]}
              >
                <Radio.Group disabled>
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
                <Select placeholder="-----select--------" disabled>
                  {/* <Option></Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="sec-container">
            <div className="sec-title">General Goods</div>
            <div className="sec-content">
              <Row gutter={20}>
                <Col span={24}>
                  <Form.Item
                    name="GeneralGoodsorService"
                    label="Whether it is hazardous chemicals (including chemicals that are easy to produce drugs and explosive)"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group disabled>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                      <Radio value={3}>No Sure</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="Environmental"
                    label="Environmental protection (such as sewage discharge), fire fighting and occupational safety articles (A. personal protective equipment; 
   B. fire fighting equipment; C. mandatory inspection equipment; D. others (please fill in the name))"
                  >
                    <Radio.Group disabled>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="test"
                    label="Other Good of Environmental Protection"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="test"
                    label="It Equipment (A. Computer And Accessories; B. Printing Equipment; C. Telephone And Fax; D. Server; e. Others)"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group disabled>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="test"
                    label="Other Equipment"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="test"
                    label="Software or Other Goods That Can Access To BV's Electronic Files or Data"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group disabled>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="sec-title">
              General services (except HR, Consulting, Subcontracting,
              Sales-related, Government-Related)
            </div>
            <div className="sec-content">
              <Row gutter={20}>
                <Col span={24}>
                  <Form.Item
                    name="GeneralGoodsorService"
                    label="Environmental Protection (e.g. Sewage Discharge), Fire Fighting And Occupational Safety Services"
                  >
                    <Select placeholder="-----select--------" disabled>
                      {/* <Option></Option> */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="ITservices"
                    label="IT services"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="-----select--------" disabled>
                      {/* <Option></Option> */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="OtherServise"
                    label="Other Servise"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="test"
                    label="Whether access to required electronic files or data is involved"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group disabled>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="sec-title">HSE Engineering Contract</div>
            <div className="sec-content">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    name="HSEEngineeringContract"
                    label="HSE Engineering Contract"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="-----select--------" disabled>
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
                <Select placeholder="-----select--------" disabled>
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
                <Radio.Group disabled>
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
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Payment4"
                label="If the budget has been approved"
                rules={[{ required: true }]}
              >
                <Radio.Group disabled>
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
                <Radio.Group disabled>
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
                <Select placeholder="-----select--------" disabled>
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
                <Select placeholder="-----select--------" disabled>
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
                <Select placeholder="-----select--------" disabled>
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
                <Select placeholder="-----select--------" disabled>
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
            <Radio.Group disabled>
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
            <Upload disabled></Upload>
          </Form.Item>
        </Card>
        <Card title="E. After-sale Arrangement" bordered={false}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="Arrangement1"
                label="Is there a warranty period"
                rules={[{ required: true }]}
              >
                <Radio.Group disabled>
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
                <Select placeholder="-----select--------" disabled>
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
                <Input disabled />
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
            <Input.TextArea disabled />
          </Form.Item>
        </Card>
        <ApprovalActions formValidataion={onSubmit}></ApprovalActions>
      </Form>
    </>
  );
};

export default index;
