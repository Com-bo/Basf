import React, { useState, useEffect } from 'react';
import './style.less';
import {
  Form,
  Input,
  Button,
  Space,
  Table,
  Pagination,
  Row,
  Col,
  Select,
  Radio,
  DatePicker,
  Upload,
  Modal,
  Menu,
  Checkbox,
  message,
  Popconfirm,
  Spin,
} from 'antd';
const { Search } = Input;
const { RangePicker } = DatePicker;
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import type { MenuProps, MenuTheme, PaginationProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import BasfHeader from '@/components/Header';
import Basfmeau from '@/components/meau';
import FormService from '@/services/form.service';

import {
  DownOutlined,
  RightOutlined,
  LeftOutlined,
  MinusOutlined,
  SearchOutlined,
  FlagOutlined,
  FileTextOutlined,
  TagOutlined,
} from '@ant-design/icons';

const index = (props: any) => {
  const formService = new FormService();
  const [rawData, setRawData] = useState<any>([]);
  const [eventData, setEventData] = useState<any>([]);

  // 维护界面
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [editListMark, setEditListMark] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totals, setTotals] = useState();
  const [showIsmainTainNews, setShowIsmainTainNews] = useState<any>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //获取活动数据
  const queryEventData = () => {
    setLoading(true);
    formService.getTableDataAll('Event', []).then((res) => {
      res.sort(function (a: any, b: any) {
        return a.StartTime < b.StartTime ? 1 : -1;
      });
      setRawData(res);
      setEventData(res);
      setTotals(res.length);
      queryMainTain(res);
      console.log(res);
      setLoading(false);
    });
  };

  // 分页
  const queryMainTain = (data: any) => {
    setShowIsmainTainNews(
      data.slice((current - 1) * pageSize, current * pageSize),
    );
  };

  useEffect(() => {
    queryMainTain(eventData);
  }, [current, eventData]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      width: '20%',
    },
    {
      title: 'Date',
      dataIndex: 'StartTime',
      key: 'StartTime',
      width: '20%',
      render: (text: any) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD')
          : text,
    },
    {
      title: 'Link',
      dataIndex: 'Link',
      key: 'Link',
      width: '20%',
      // render: (text: any, record: any) => {
      //   return <a href={record.Link?.Url}>{record.Link?.Url}</a>;
      // },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      render: (text: any, record: any, index: any) => {
        return (
          <>
            <Space className="actions">
              <a
                onClick={() => {
                  form.setFieldsValue({
                    ...record,
                    EndTime:
                      record.EndTime && moment(record.EndTime).isValid()
                        ? moment(record.EndTime)
                        : null,
                    StartTime:
                      record.StartTime && moment(record.StartTime).isValid()
                        ? moment(record.StartTime)
                        : null,
                  });
                  openModal();
                }}
              >
                Edit
              </a>

              <Popconfirm
                title="Are you sure?"
                onConfirm={(event: any) => {
                  event.stopPropagation();
                  formService.removeItem('Event', record.key).then(() => {
                    Successfuloperation();
                  });
                }}
                okText="Yes"
                cancelText="Cancel"
              >
                <Button
                  type="text"
                  key="2"
                  onClick={(event) => event.stopPropagation()}
                  icon={<i className="gbs gbs-delete"></i>}
                >
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current: any,
    pageSize: any,
  ) => {
    setCurrent(current);
  };

  const saveData = () => {
    form.validateFields().then(() => {
      if (form.getFieldValue('key')) {
        formService
          .updateItem('Event', form.getFieldValue('key'), {
            ...form.getFieldsValue(),
          })
          .then((res) => {
            Successfuloperation();
          });
      } else {
        formService
          .addItem('Event', { ...form.getFieldsValue() })
          .then((res) => {
            Successfuloperation();
          });
      }
    });
  };

  useEffect(() => {
    queryEventData();
  }, []);

  const openModal = () => {
    setEditListMark(true);
    setComponentDisabled(false);
  };

  const closeModal = () => {
    setEditListMark(false);
    form.resetFields();
  };

  const Successfuloperation = () => {
    message.success('Successful operation.');
    closeModal();
    queryEventData();
  };

  const validEndMonth = (rule: any, value: any, callback: any) => {
    if (
      form.getFieldValue('StartTime') &&
      value &&
      (form.getFieldValue('StartTime') >= value ||
        value.format('YYYY-MM-DD HH:MM:SS') ==
          form.getFieldValue('StartTime').format('YYYY-MM-DD HH:MM:SS'))
    ) {
      return Promise.reject(
        new Error('The end month must be greater than the start month;'),
      );
    }
    return Promise.resolve();
  };
  const onTitleSearch = (value: string) => {
    const reg = new RegExp(`${value}`, 'gi');
    const newdata = rawData.filter((x: any) => x.Title.match(reg));
    setEventData(newdata);
    setTotals(newdata.length);
    setCurrent(1);
  };
  return (
    <>
      {/* 编辑*/}
      <Modal
        style={{ top: 200 }}
        maskClosable={false}
        width="800px"
        visible={editListMark}
        footer={null}
        onCancel={() => {
          closeModal();
        }}
      >
        <div className="maintain_table_action">
          <div className="partTitle">
            <div className="partTitleHeadLine">Events</div>
          </div>
        </div>
        <Form form={form} labelCol={{ flex: '100px' }}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="Title"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="Time"
                name="StartTime"
                rules={[{ required: true }]}
              >
                <DatePicker
                  showTime
                  disabled={componentDisabled}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label=""
                name="EndTime"
                rules={[
                  { required: true },
                  {
                    validator: validEndMonth,
                  },
                ]}
              >
                <DatePicker
                  showTime
                  disabled={componentDisabled}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item valuePropName="checked" name="AllDataEvent">
                <Checkbox>All data Event</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Hot"
                label="Hot Event"
                valuePropName="value"
                rules={[{ required: true, message: "'Hot Event' is required" }]}
              >
                <Radio.Group disabled={componentDisabled}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Location"
                label="Location"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Link" label="Link" rules={[{ required: true }]}>
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item style={{ textAlign: 'center' }}>
                <Space>
                  <Button
                    className="btn"
                    onClick={() => {
                      setEditListMark(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="btn" type="primary" onClick={saveData}>
                    Save
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <BasfHeader></BasfHeader>

      <div className="maintain">
        <div className="maintain_title">
          <Basfmeau></Basfmeau>
        </div>
        <div className="maintain_content">
          <div className="maintain_table_action">
            <div className="partTitle">
              <div className="partTitleHeadLine">Event Management</div>
            </div>
            <Space>
              <Search
                placeholder="Title"
                onSearch={onTitleSearch}
                style={{ width: 200 }}
              />
              <Button
                className="def"
                onClick={() => {
                  setEditListMark(true);
                  setComponentDisabled(false);
                }}
              >
                Add
              </Button>
            </Space>
          </div>

          <Table
            dataSource={showIsmainTainNews}
            columns={columns}
            pagination={false}
            scroll={{ y: 'calc(100vh - 330px)' }}
          />

          <Pagination
            current={current}
            total={totals}
            pageSize={pageSize}
            onChange={onShowSizeChange}
          />
        </div>
      </div>

      {loading ? (
        <div className="spinGroup">
          <Spin></Spin>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default index;
