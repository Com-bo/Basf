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
import HttpService from '@/common/http.service';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import type { MenuProps, MenuTheme, PaginationProps } from 'antd';
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

const index = () => {
  const formService = new FormService();
  const [rawData, setRawData] = useState<any>([]);
  const [newData, setNewData] = useState<any>([]);
  const listName = 'News';
  const listFilesName = 'NewsFiles';
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

  // 上传附件
  const [file, setFile] = useState<any>();
  const [isCanUpload, setCanUpload] = useState(true);
  const uploadProps = {
    onChange() {
      let _listFile = form.getFieldValue('UploadFile');
      if (!_listFile || _listFile.fileList <= 0) {
        setCanUpload(true);
      } else {
        setCanUpload(false);
      }
    },
  };
  // 上传图片
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<any>();
  const uploadFile = async (id: any) => {
    console.log(fileList, id);
    let reader = new FileReader();
    let arrayBuffer = await new Promise(
      (resolve: (e: any) => void, reject: (e: any) => void) => {
        reader.onloadend = function (e: any) {
          resolve(e.target.result);
        };
        reader.onerror = function (e: any) {
          reject(e.target.error);
        };
        reader.readAsArrayBuffer(fileList.file.originFileObj);
      },
    );

    return formService
      .upImage(listName, id, fileList, arrayBuffer)
      .then((res) => {
        formService.upImageValidateUpdateListItem(res, id);
      });
  };

  //获取新闻信息
  const queryNewData = () => {
    setLoading(true);
    formService.getTableDataAll('News', []).then((res) => {
      // console.log(res);
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
      // console.log(res);
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
      render: (text: any, record: any) => {
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
                    Tag: record.Tag.split(','),
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
  ) => {
    setCurrent(current);
  };

  const saveData = () => {
    form.validateFields().then(async () => {
      var key = form.getFieldValue('key');
      if (key) {
        formService
          .updateItem(listName, key, {
            Title: form.getFieldValue('Title'),
            PublishDate: form.getFieldValue('PublishDate'),
            OnTop: form.getFieldValue('OnTop'),
            Writer: form.getFieldValue('Writer'),
            Content: form.getFieldValue('Content').toHTML(),
            Tag: form.getFieldValue('Tag').join(','),
          })
          .then(() => {
            let NewsId = key;
            uploadFile(NewsId);

            if (file != undefined) {
              uploadFileFun(
                file.name,
                listFilesName,
                file,
                process.env.taskRelativePath,
              ).then((res) => {
                getonFileByUrl(res.d.ListItemAllFields.__deferred.uri).then(
                  (res) => {
                    updateFileItem(res, {
                      NewsId: NewsId,
                    }).then(() => {});
                  },
                );
              });
            }
            Successfuloperation();
          });
      } else {
        formService
          .addItem(listName, {
            Title: form.getFieldValue('Title'),
            PublishDate: form.getFieldValue('PublishDate'),
            OnTop: form.getFieldValue('OnTop'),
            Writer: form.getFieldValue('Writer'),
            Content: form.getFieldValue('Content').toHTML(),
            Tag: form.getFieldValue('Tag').join(','),
          })
          .then((res) => {
            let NewsId = res.ID;
            uploadFile(NewsId);

            console.log(file);

            if (file != undefined) {
              uploadFileFun(
                file.name,
                listFilesName,
                file,
                process.env.taskRelativePath,
              ).then((res) => {
                getonFileByUrl(res.d.ListItemAllFields.__deferred.uri).then(
                  (res) => {
                    updateFileItem(res, {
                      NewsId: NewsId,
                    }).then(() => {});
                  },
                );
              });
            }
            Successfuloperation();
          });
      }
    });
  };
  const handleChangeBraftEditor = () => {};

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
    setCanUpload(true);
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
              <Form.Item
                name="Title"
                label="Title"
                rules={[{ required: true }]}
              >
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
                  showTime
                  format="YYYY-MM-DD HH:mm"
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
              <Form.Item
                name="Writer"
                label="Writer"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="BacImg" label="Display Image">
                {/* <div style={{ minHeight: '122px' }}>
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
                </div> */}
                <Upload
                  onChange={(file) => {
                    setFileList(file);
                  }}
                >
                  <Button>上传图片</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Content"
                label="Content"
                rules={[{ required: true }]}
              >
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
