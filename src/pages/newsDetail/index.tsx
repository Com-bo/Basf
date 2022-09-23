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
  const [Tags, setTags] = useState<any>([]);
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
        console.log(res);
        var newsKey = Number(window.location.search.split('=')[1]);
        setShowNews(res.filter((y: any) => y.key == newsKey)[0]);

        setTags(res.filter((y: any) => y.key == newsKey)[0].Tag.split(','));
      });

    // formService
    // .getTableDataAll(
    //   'NewsFiles',[]).then((res) => {
    //     console.log(res)
    //   })
  };
  useEffect(() => {
    queryNewData();
  }, []);
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
          {/* <img src={require('@/assets/images/detailbg.png')} alt="" /> */}
        </div>
        <div className="newsDetailbody">
          {/* <img className='bgimg' src={require('@/assets/images/detailbg.png')} alt="" /> */}
          <div className="part">
            <div className="content">
              <div className="title">
                <img src={require('@/assets/images/newstitle.png')} alt="" />
                <div className="title_Name">{showNews.Title}</div>
              </div>
              <div className="title_text">
                <div>
                  <img src={require('@/assets/images/newstime.png')} alt="" />
                  <div>
                    {moment(showNews.Created).format('YYYY-MM-DD HH:MM:SS')}
                  </div>
                </div>
                <div>
                  <img src={require('@/assets/images/newswriter.png')} alt="" />
                  <div>{showNews.Writer}</div>
                </div>
              </div>

              <div className="tags">
                {Tags.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.location.href = `${process.env.pagePath}/readIT/index?Tag=${item}`;
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>

              <div dangerouslySetInnerHTML={{ __html: showNews.Content }}></div>

              <div className="fujian">
                <img src={require('@/assets/images/fujian.png')} alt="" />
                {/* <div className="fujianitem">
                  <div>Microsoft Teams user Guide .pdf</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
