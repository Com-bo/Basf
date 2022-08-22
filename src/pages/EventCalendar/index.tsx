import React, { useState, useEffect } from 'react';
import styles from './index.less';
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
  Menu,
  Dropdown,
  Button,
  Space,
  Checkbox,
  Col,
  Row,
} from 'antd';
const { Option } = Select;
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import NewForm from '@/components/generalPurchaseForm/newForm';
import EditForm from '@/components/generalPurchaseForm/editForm';
import DispForm from '@/components/generalPurchaseForm/dispForm';

import BasfHeader from '@/components/Header';

import avatar from '@/assets/images/avatar.png';
import type { MenuProps, DatePickerProps } from 'antd';
import { DownOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { getFileInfo } from 'prettier';
import FormService from '@/services/form.service';
const index = (props: any) => {
  const formService = new FormService();
  const [newData, setNewData] = useState<any>([]);
  const [showNews, setShowNews] = useState<any>([]);

  const onYearChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setYearData(moment(dateString, yearFormat));
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange = (value: number) => {
    console.log('changed', value);
  };

  const [monthData, setMonthData] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  const yearFormat = 'YYYY';
  const [yearData, setYearData] = useState(moment('2015', yearFormat));

  const getWeek = (date: any) => {
    let week = moment(date).day();
    console.log(week);
    switch (week) {
      case 1:
        return 'Sun';
      case 2:
        return 'Mon';
      case 3:
        return 'Tue';
      case 4:
        return 'Wed';
      case 5:
        return 'Thur';
      case 6:
        return 'Fri';
      case 0:
        return 'Sat';
    }
  };

  //获取数据
  const queryEventData = () => {
    formService.getTableDataAll('Event', []).then((res) => {
      console.log(res);
      // const EventData=JSON.parse(JSON.stringify(res))
      // EventData.map((item:any,index:any)=>{
      //   item.StartTime=getWeek(item.StartTime)
      // })
      // console.log(EventData)
      setNewData(res);
      setShowNews(res);
    });
  };

  useEffect(() => {
    queryEventData();
  }, []);
  return (
    <>
      <BasfHeader></BasfHeader>
      <div className="headerArticle">
        <img src={require('@/assets/images/event.png')} alt="" />
      </div>

      <div className="eventCalendar">
        <div className="dataPick">
          <DatePicker
            value={yearData}
            onChange={onYearChange}
            picker="year"
            clearIcon=""
            suffixIcon={<DownOutlined />}
          />
          <Select style={{ width: 120 }} onChange={handleChange}>
            {monthData.map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })}
          </Select>
          {/* <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
          <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} /> */}
        </div>
        <div className="part">
          <div className="partProWrap">
            {showNews?.map((item: any, index: any) => {
              return (
                <div className="partProWrapItem" key={index}>
                  <div className="partProWrapItemLeft">
                    <div>8</div>
                    <div>jun</div>
                  </div>
                  <div className="partProWrapItemRight">
                    <div>{item.Title}</div>
                    <div>Tue, Jun 8, 09:30 {getWeek(item.StartTime)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
