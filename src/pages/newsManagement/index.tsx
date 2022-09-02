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
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totals, setTotals] = useState();
  const [showIsmainTainNews, setShowIsmainTainNews] = useState<any>([]);
  const [form] = Form.useForm();
  const imgprops = {
    width: 500, //裁剪宽度
    height: 300, //裁剪高度
    resize: false, //裁剪是否可以调整大小
    resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
    modalTitle: '上传图片', //弹窗标题
    modalWidth: 600, //弹窗宽度
  };

  //获取tag
  const queryTags = () => {
    formService.getTableDataAll('Tag', []).then((res) => {
      setTagData(res);
      setShowTags(res);
    });
  };

  //获取新闻信息
  const queryNewData = () => {
    formService.getTableDataAll('News', []).then((res) => {
      res.sort(function (a: any, b: any) {
        return a.PublishDate < b.PublishDate ? 1 : -1;
      });
      res.map((item: any, index: any) => {
        res[index].BacImg = `${JSON.parse(item.DisplayImage).serverUrl}${
          JSON.parse(item.DisplayImage).serverRelativeUrl
        }`;
      });
      setNewData(res);
      console.log(res, res.length);
      setTotals(res.length);
      setShowNews(res.slice(0, 4));
      queryMainTain(res);
    });
  };

  // 分页
  const queryMainTain = (data: any) => {
    setShowIsmainTainNews(
      data.slice((current - 1) * pageSize, current * pageSize),
    );
  };

  useEffect(() => {
    queryMainTain(newData);
  }, [current]);

  //获取活动数据
  const queryEventData = () => {
    formService.getTableDataAll('Event', []).then((res) => {
      res.sort(function (a: any, b: any) {
        return a.StartTime < b.StartTime ? 1 : -1;
      });
      setEventData(res);
      setShowEvent(res.slice(0, 4));
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      width: '20%',
    },
    {
      title: 'Tag',
      dataIndex: 'Tag',
      key: 'Tag',
      width: '20%',
    },
    {
      title: 'Publish Date',
      dataIndex: 'PublishDate',
      key: 'PublishDate',
      width: '20%',
      render: (text: any) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD')
          : text,
    },
    {
      title: 'Writer',
      dataIndex: 'Writer',
      key: 'Writer',
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
              <a className="publish">Publish</a>
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

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChangeDisplayImage: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const onPreviewDisplayImage = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const saveData = () => {
    console.log(form.getFieldsValue());
  };
  const handleChangeBraftEditor = (val: any) => {
    // onChange(val);
    console.log('val: ', val);
  };

  useEffect(() => {
    queryTags();
    queryNewData();
    queryEventData();
  }, []);

  return (
    <>
      <BasfHeader></BasfHeader>

      <div className="maintain">
        <div className="maintain_title">
          <Basfmeau></Basfmeau>
        </div>

        {!isAdd ? (
          <div className="maintain_content">
            <div className="maintain_table_action">
              <div className="partTitle">
                <div className="partTitleHeadLine">News Management</div>
              </div>
              <Space>
                <Input
                  placeholder="Title、Tag、Writer"
                  prefix={<SearchOutlined />}
                />
                <Button>Search</Button>
                <Button
                  onClick={() => {
                    setIsAdd(true);
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
        ) : (
          <div className="maintain_content">
            <div className="maintain_table_action">
              <div className="partTitle">
                <div className="partTitleHeadLine">Add News</div>
              </div>
            </div>

            <Form form={form} labelCol={{ flex: '150px' }}>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item name="Title" label="Title">
                    <Input disabled={componentDisabled} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Tag"
                    label="Tag"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="-----select--------"
                      disabled={componentDisabled}
                    >
                      {/* <Option></Option> */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Time"
                    name="Time"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      disabled={componentDisabled}
                      picker="month"
                      format="YYYYMM"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="OnTop"
                    label="On Top"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group disabled={componentDisabled}>
                      <Radio value={1}>A</Radio>
                      <Radio value={2}>B</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Writer" label="Writer">
                    <Input disabled={componentDisabled} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="DisplayImage" label="Display Image">
                    <ImgCrop {...imgprops}>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChangeDisplayImage}
                        onPreview={onPreviewDisplayImage}
                      >
                        {fileList.length < 5 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="Content" label="Content">
                    <BraftEditor
                      onChange={handleChangeBraftEditor}
                      contentStyle={{ height: 200 }}
                      style={{
                        border: '1px solid #d9d9d9',
                        marginBottom: '20px',
                      }}
                      //  placeholder={placeholder}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Attachment" label="Attachment">
                    <Button type="primary" className="btn">
                      Upload
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Space>
                      <Button className="btn">Preview</Button>
                      <Button className="btn" type="primary" onClick={saveData}>
                        Save
                      </Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </div>

      {/* {robotMark ? (
        <div className="robotDiv" onClick={getInfo}>
          <img src={require('@/assets/images/robot.png')} alt="" />
        </div>
      ) : (
        ''
      )} */}

      {/* {robotMark ? (
        ''
      ) : (
        <div className="qaInfo">
          <div className="qaInfoTitle">
            <div className="qaInfoTit">little Assistant</div>
            <MinusOutlined onClick={getInfo} />
          </div>
          <div className="qaInfoArticle">
            <div className="qaInfoTime">3:18</div>
            <div className="conversationList">
              <div className="conversation conversationYou">
                <div className="conversationAvatar">
                  <img src={require('@/assets/images/robothead.png')} alt="" />
                </div>
                <div className="conversationInfo">
                  Hi,I am your G2D assistance,ask me something.
                </div>
              </div>
              <div className="conversation conversationMe">
                <div className="conversationAvatar">
                  <img src={require('@/assets/images/user.png')} alt="" />
                </div>
                <div className="conversationInfo">
                  Hi,I am your G2D assistance,ask me something.
                </div>
              </div>
            </div>
            <div className="conversationEnter">
              <textarea placeholder="Please Enter"></textarea>
              <div>
                <img src={require('@/assets/images/send.png')} alt="" />
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default index;
