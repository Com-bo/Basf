import React, { useState, useEffect } from 'react';
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
} from 'antd';
const { RangePicker } = DatePicker;
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

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
  const [eventData, setEventData] = useState<any>([]);

  // 维护界面
  const [ismaintain, setIsmaintain] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [editListMark, setEditListMark] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totals, setTotals] = useState();
  const [showIsmainTainNews, setShowIsmainTainNews] = useState<any>([]);
  const [form] = Form.useForm();
  const [formDataEdit] = Form.useForm();

  //获取活动数据
  const queryEventData = () => {
    formService.getTableDataAll('Event', []).then((res) => {
      res.sort(function (a: any, b: any) {
        return a.StartTime < b.StartTime ? 1 : -1;
      });
      setEventData(res);
      setTotals(res.length);
      queryMainTain(res);
      console.log(res);
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
  }, [current]);

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
      render: (text: any, record: any) => {
        console.log(record.Link?.Url);
        return <a href={record.Link?.Url}>{record.Link?.Url}</a>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      render: () => {
        return (
          <>
            <Space className="actions">
              <a>Edit</a>
              <a>Delete</a>
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
    console.log(current, pageSize);
    setCurrent(current);
  };

  const saveData = () => {
    console.log(form.getFieldsValue());
  };

  useEffect(() => {
    queryEventData();
  }, []);

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
          setEditListMark(false);
          formDataEdit.resetFields();
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
              <Form.Item name="Title" label="Title">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Time" name="Time" rules={[{ required: true }]}>
                {/* <DatePicker
                    disabled={componentDisabled}
                    picker="month"
                    format="YYYYMM"
                    style={{ width: '100%' }}
                  /> */}
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Hot Event"
                label="Hot Event"
                rules={[{ required: true }]}
              >
                <Radio.Group disabled={componentDisabled}>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Location" label="Location">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Link" label="Link">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Description" label="Description">
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
              <Button
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
    </>
  );
};

export default index;
