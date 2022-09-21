import React, { useState, useEffect } from 'react';
import './style.less';
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Spin,
  message,
  Menu,
  Dropdown,
  Button,
  Space,
  Checkbox,
  Col,
  Row,
} from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import BasfHeader from '@/components/Header';
import avatar from '@/assets/images/avatar.png';
import type { MenuProps, DatePickerProps } from 'antd';
import { DownOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { getFileInfo } from 'prettier';
import FormService from '@/services/form.service';
const index = (props: any) => {
  const [loading, setLoading] = useState(false);
  const formService = new FormService();
  const [newData, setNewData] = useState<any>([]);
  const [showNews, setShowNews] = useState<any>([]);
  //获取新闻信息
  const queryNewData = () => {
    formService
      .getTableDataAll(
        'News',
        [],
        // [
        //   {
        //     type: 'filter eq',
        //     value: "SAP",
        //     properties: ['Tag'],
        //   }
        // ],
      )
      .then((res) => {
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
        setShowNews(res);
      });
  };
  return (
    <>
      {loading ? (
        <div className="spinGroup">
          <Spin></Spin>
        </div>
      ) : (
        ''
      )}
      <BasfHeader></BasfHeader>
      <div className="newsDetail">
        <div className="headerArticle">
          {/* <img src={require('@/assets/images/newsDetail.png')} alt="" /> */}
        </div>
        <div className="newsDetailbody">
          <div className="part">
            <div className="content">
              <div className="title">
                <img src={require('@/assets/images/newstitle.png')} alt="" />
                <div className="title_Writer">Read IT GC -</div>
                <div className="title_Name">
                  Instruction and Q&A about MS Teams
                </div>
              </div>
              <div className="title_text">
                <div>
                  <img src={require('@/assets/images/newstime.png')} alt="" />
                  <div>2022-08-22 16:20</div>
                </div>
                <div>
                  <img src={require('@/assets/images/newswriter.png')} alt="" />
                  <div>Esther chen</div>
                </div>
              </div>
              <div className="fujian">
                <img src={require('@/assets/images/fujian.png')} alt="" />
                <div className="fujianitem">
                  <div>Microsoft Teams user Guide .pdf</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
