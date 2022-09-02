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
  const [robotMark, setRobotMark] = useState(true);
  const [newData, setNewData] = useState<any>([]);
  const [showNews, setShowNews] = useState<any>([]);
  const [tagData, setTagData] = useState<any>([]);
  const [showTags, setShowTags] = useState(Array<any>());
  const [eventData, setEventData] = useState<any>([]);
  const [showEvent, setShowEvent] = useState(Array<any>());
  const [SolutionLink, setSolutionLink] = useState<any>([
    'https://apps.powerapps.com/play/e/b240154e-fa0f-45e9-b470-5d6d1c29d82d/a/194ab89b-0179-4800-b341-5b7b7de03a76?tenantId=ecaa386b-c8df-4ce0-ad01-740cbdb5ba55&source=portal',
    'https://basf.sharepoint.com/sites/learn-together   ',
  ]);

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

  //获取tag
  const queryTags = () => {
    formService.getTableDataAll('Tag', []).then((res) => {
      setTagData(res);
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
    queryMainTain(tagData);
  }, [current]);

  const columns = [
    {
      title: 'No.',
      dataIndex: 'No',
      key: 'No',
      width: '20%',
    },
    {
      title: 'Tag Name',
      dataIndex: 'Title',
      key: 'Title',
      width: '20%',
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
    queryTags();
  }, []);

  return (
    <>
      {/* 编辑*/}
      <Modal
        style={{ top: 400 }}
        maskClosable={false}
        width="500px"
        visible={editListMark}
        footer={null}
        onCancel={() => {
          setEditListMark(false);
          formDataEdit.resetFields();
        }}
      >
        <div className="maintain_table_action">
          <div className="partTitle">
            <div className="partTitleHeadLine">New Tags</div>
          </div>
        </div>
        <Form form={form} labelCol={{ flex: '100px' }}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item name="Title" label="Tag Name">
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
              <div className="partTitleHeadLine">Tags Management</div>
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
