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
  Popconfirm,
  Tooltip,
  Menu,
  Spin,
  message,
} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import Loading from '@/components/loading/Loading';
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
  const [tagData, setTagData] = useState<any>([]);

  // 维护界面
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [editListMark, setEditListMark] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totals, setTotals] = useState();
  const [showIsmainTainNews, setShowIsmainTainNews] = useState<any>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //获取tag
  const queryTags = () => {
    setLoading(true);
    formService.getTableDataAll('Tag', []).then((res) => {
      var resTagData = res.reverse();
      resTagData.map((item: any, index: any) => {
        resTagData[index]['NoIndex'] = index + 1;
      });
      console.log(resTagData);
      setTagData(resTagData);
      queryMainTain(resTagData);
      setTotals(res.length);
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
    queryMainTain(tagData);
  }, [current]);

  const columns = [
    {
      title: 'No.',
      dataIndex: 'NoIndex',
      key: 'NoIndex',
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
      render: (text: any, record: any, index: any) => {
        return (
          <>
            <Space className="actions">
              <a
                onClick={() => {
                  form.setFieldsValue({
                    ...record,
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
                  formService.removeItem('Tag', record.key).then(() => {
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
          .updateItem('Tag', form.getFieldValue('key'), {
            Title: form.getFieldValue('Title'),
          })
          .then((res) => {
            Successfuloperation();
          });
      } else {
        formService
          .addItem('Tag', { Title: form.getFieldValue('Title') })
          .then((res) => {
            Successfuloperation();
          });
      }
    });
  };

  useEffect(() => {
    queryTags();
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
    queryTags();
  };

  return (
    <>
      {/* 编辑*/}
      <Modal
        style={{ top: 400 }}
        maskClosable={false}
        width="500px"
        visible={editListMark}
        footer={null}
        onCancel={closeModal}
      >
        <div className="maintain_table_action">
          <div className="partTitle">
            <div className="partTitleHeadLine">New Tags</div>
          </div>
        </div>
        <Form form={form} labelCol={{ flex: '100px' }}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="Title"
                label="Tag Name"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item style={{ textAlign: 'center' }}>
                <Space>
                  <Button className="btn" onClick={closeModal}>
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
              <Button className="def" onClick={openModal}>
                Add
              </Button>
            </Space>
          </div>

          <Table
            dataSource={showIsmainTainNews}
            columns={columns}
            pagination={false}
            rowKey={(record) => record.key}
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
