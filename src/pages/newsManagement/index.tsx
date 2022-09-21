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
  Popconfirm,
  message,
  Spin,
} from 'antd';
const { Search } = Input;
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
  removeItem,
  updateItem,
  addItem,
  deleteFileItem,
  uploadFileFun,
  updateFileItem,
  updateFile,
  getFileItemByFileName,
  getonFileByUrl,
} from '@/services/sharepointApi';
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [rawData, setRawData] = useState<any>([]);
  const [newData, setNewData] = useState<any>([]);
  const listName = 'NewsData';
  const [tagData, setTagData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [dataStatus, setDataStatus] = useState(false);

  // 维护界面
  const [isAdd, setIsAdd] = useState(false);
  const [editListMark, setEditListMark] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totals, setTotals] = useState(0);
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

  const [file, setFile] = useState<any>();
  const [isCanUpload, setCanUpload] = useState(true);
  // 设定【上传控件 - 属性】
  const uploadProps = {
    onChange() {
      let _listFile = form.getFieldValue('UploadFile');
      // 只能上传一个文件
      if (!_listFile || _listFile.fileList <= 0) {
        setCanUpload(true);
      } else {
        setCanUpload(false);
      }
    },
  };

  //获取新闻信息
  const queryNewData = () => {
    setLoading(true);
    formService.getTableDataAll('NewsData', []).then((res) => {
      console.log(res);
      res.sort(function (a: any, b: any) {
        return a.PublishDate < b.PublishDate ? 1 : -1;
      });
      res.map((item: any, index: any) => {
        res[index].BacImg = item.DisplayImage
          ? `${JSON.parse(item.DisplayImage).serverUrl}${
              JSON.parse(item.DisplayImage).serverRelativeUrl
            }`
          : '';
      });
      setNewData(res);
      setRawData(res);
      setTotals(res.length);
      queryMainTain(res);
      console.log(res);
      setLoading(false);
    });
  };

  //获取tag
  const queryTags = () => {
    formService.getTableDataAll('Tag', []).then((res) => {
      var resTagData = res.reverse();
      setTagData(resTagData);
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
  }, [current, newData]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'TitleName',
      key: 'TitleName',
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
      render: (text: any, record: any, index: any) => {
        return (
          <>
            <Space className="actions">
              {/* <a className="publish">Publish</a> */}
              <a
                onClick={() => {
                  setDataStatus(false);
                  openModal();
                  form.setFieldsValue({
                    ...record,
                    PublishDate:
                      record.PublishDate && moment(record.PublishDate).isValid()
                        ? moment(record.PublishDate)
                        : null,
                    Content: BraftEditor.createEditorState(record.Content),
                  });
                }}
              >
                Edit
              </a>
              <Popconfirm
                title="Are you sure?"
                onConfirm={(event: any) => {
                  event.stopPropagation();
                  formService.removeItem('News', record.key).then(() => {
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

  const onChangeDisplayImage: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    console.log(newFileList);
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
    form.validateFields().then(async () => {
      var key = form.getFieldValue('key');
      var fileName = '';
      var expandItems = ['FileLeafRef'];
      if (key) {
        var FileItems = await formService.getFileItemsById(listName, key);
        fileName = FileItems.File.Name;
        // 设定【保存数据】
        var saveData = {
          ...form.getFieldsValue(),
          Content: form.getFieldValue('Content').toHTML(),
          FileName: fileName,
        };
        console.log(saveData);
        // 执行【数据更新】
        try {
          formService
            .updateLibItem(listName, key, saveData, expandItems)
            .then(() => {});
        } catch (e) {}
      } else {
        uploadFileFun(
          file.name,
          listName,
          file,
          process.env.taskRelativePath,
        ).then((res) => {
          var innerName = res.innerName;
          console.log(res);
          getonFileByUrl(res.d.ListItemAllFields.__deferred.uri).then((res) => {
            console.log(res);
            updateFileItem(res, {
              Writer: form.getFieldValue('Writer'),
              Tag: form.getFieldValue('Tag'),
              PublishDate: moment(form.getFieldValue('PublishDate')).format(
                'YYYY-MM-DD',
              ),
              Content: form.getFieldValue('Content')?.toHTML(),
            }).then((res) => {
              console.log(res);
            });
          });
        });
      }
    });
  };
  const handleChangeBraftEditor = (val: any) => {};

  useEffect(() => {
    queryNewData();
    queryTags();
  }, []);
  // getTablePagingList

  const onTitleSearch = (value: string) => {
    const reg = new RegExp(`${value}`, 'gi');
    var newdataTitle = rawData.filter((x: any) => x.Title.match(reg));
    var newdataTag = rawData.filter((x: any) => x.Tag.match(reg));
    var newdataWriter = rawData.filter((x: any) => x.Writer.match(reg));
    var newdata = newdataTitle.concat(newdataTag).concat(newdataWriter);
    var newIndexData: any[] = [];
    newdata.forEach(function (n: any) {
      if (newIndexData.indexOf(n) == -1) {
        newIndexData.push(n);
      }
    });
    setNewData(newIndexData);
    setTotals(newIndexData.length);
    setCurrent(1);
  };

  const Successfuloperation = () => {
    message.success('Successful operation.');
    closeModal();
    queryNewData();
  };
  const closeModal = () => {
    setEditListMark(false);
    form.resetFields();
  };
  const openModal = () => {
    setEditListMark(true);
    setComponentDisabled(false);
  };

  return (
    <>
      {/* 编辑*/}
      <Modal
        maskClosable={false}
        width="1500px"
        visible={editListMark}
        footer={null}
        onCancel={closeModal}
      >
        <div className="maintain_table_action">
          <div className="partTitle">
            <div className="partTitleHeadLine">
              {dataStatus ? 'Add' : 'Edit'} News
            </div>
          </div>
        </div>
        <Form form={form} labelCol={{ flex: '150px' }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="TitleName" label="Title">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Tag" label="Tag" rules={[{ required: true }]}>
                <Select
                  placeholder="-----select--------"
                  disabled={componentDisabled}
                  mode="multiple"
                  // size="5"
                >
                  {tagData.map((item: any, index: any) => (
                    <Select.Option key={index} value={item.Title}>
                      {item.Title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Time"
                name="PublishDate"
                rules={[{ required: true }]}
              >
                <DatePicker
                  disabled={componentDisabled}
                  picker="month"
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="OnTop"
                label="On Top"
                valuePropName="value"
                rules={[{ required: true }]}
              >
                <Radio.Group disabled={componentDisabled}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Writer" label="Writer">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="BacImg" label="Display Image">
                <div style={{ minHeight: '122px' }}>
                  <ImgCrop {...imgprops}>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChangeDisplayImage}
                      onPreview={onPreviewDisplayImage}
                    >
                      {fileList.length < 1 && '+ Upload'}
                    </Upload>
                  </ImgCrop>
                </div>
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
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="UploadFile" label="Attachment">
                <Upload
                  beforeUpload={(f) => {
                    setFile(f);
                  }}
                  {...uploadProps}
                >
                  {isCanUpload ? <Button>Upload</Button> : ''}
                </Upload>
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
      </Modal>
      {/* <SharePoint:InputFormTextBox id="txt" runat="server" RichTextMode="HtmlAsXml" RichText="True" Rows="5" Width="186px" Height="74px" TextMode="MultiLine"/> */}
      <BasfHeader></BasfHeader>

      <div className="maintain">
        <div className="maintain_title">
          <Basfmeau></Basfmeau>
        </div>

        <div className="maintain_content">
          <div className="maintain_table_action">
            <div className="partTitle">
              <div className="partTitleHeadLine">News Management</div>
            </div>
            <Space>
              <Search
                placeholder="Title、Tag、Writer、"
                onSearch={onTitleSearch}
                style={{ width: 200 }}
              />
              <Button
                className="def"
                onClick={() => {
                  openModal();
                  setDataStatus(true);
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
