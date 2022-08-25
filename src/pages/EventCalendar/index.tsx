import React, { useState, useEffect } from 'react';
import styles from './index.less';
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
  const [loading, setLoading] = useState(false);
  const formService = new FormService();
  const [newData, setNewData] = useState<any>([]);
  const [showNews, setShowNews] = useState<any>([]);
  const yearFormat = 'YYYY';
  const [monthData, setMonthData] = useState([
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ]);
  const [yearDataCurrent, setYearDataCurrent] = useState(
    moment(`${moment().year()}`, yearFormat),
  );
  const [monthDataCurrent, setMonthDataCurrent] = useState(
    `${moment().format('MM')}`,
  );
  const [dateDataCurrent, setDateDataCurrent] = useState();
  const [dateDataCurrent1, setDateDataCurrent1] = useState();

  const onYearChange: DatePickerProps['onChange'] = (
    date: any,
    dateString: any,
  ) => {
    setYearDataCurrent(date);
  };

  const onMonthChange = (value: any) => {
    setMonthDataCurrent(value);
  };

  const onDateChange = (value: any, date: any) => {
    setDateDataCurrent(value);
    setDateDataCurrent1(date);
  };

  const getWeek = (date: any) => {
    let week = moment(date).day();
    switch (week) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thur';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    }
  };

  const getMonth = (date: any) => {
    let month = moment(date).format('MM');
    switch (month) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sept';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
    }
  };

  const getDate = (date: any) => {
    return moment(date).format('DD');
  };

  const getTime = (date: any) => {
    return moment(date).format('HH:mm');
  };

  //获取数据
  const queryEventData = () => {
    formService.getTableDataAll('Event', []).then((res) => {
      setNewData(res);
      res.sort(function (a: any, b: any) {
        return a.StartTime < b.StartTime ? 1 : -1;
      });
      setShowNews(
        res
          .filter(
            (x: any) =>
              moment(x.StartTime).year() == moment(yearDataCurrent).year(),
          )
          .filter(
            (x: any) => moment(x.StartTime).format('MM') == monthDataCurrent,
          ),
      );
    });
  };

  const onQueryFilter = (year: any, month: any, date: any) => {
    console.log(year, month, date, showNews);
    setLoading(true);
    if (date && date[0] && date[1]) {
      setShowNews(
        newData
          .filter((x: any) => moment(x.StartTime).year() == year)
          .filter((x: any) => moment(x.StartTime).format('MM') == month)
          .filter((x: any) => Number(getDate(x.StartTime)) >= Number(date[0]))
          .filter((x: any) => Number(getDate(x.StartTime)) <= Number(date[1])),
      );
    } else {
      setShowNews(
        newData
          .filter((x: any) => moment(x.StartTime).year() == year)
          .filter((x: any) => moment(x.StartTime).format('MM') == month),
      );
    }
  };
  useEffect(() => {
    queryEventData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [showNews]);

  useEffect(() => {
    onQueryFilter(
      moment(yearDataCurrent).year(),
      monthDataCurrent,
      dateDataCurrent1,
    );
  }, [yearDataCurrent, monthDataCurrent, dateDataCurrent1]);

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
      <div className="headerArticle">
        <img src={require('@/assets/images/event.png')} alt="" />
      </div>

      <div className="eventCalendar">
        <div className="dataPick">
          <DatePicker
            value={yearDataCurrent}
            onChange={onYearChange}
            picker="year"
            clearIcon=""
            suffixIcon={<DownOutlined />}
          />
          <Select
            style={{ width: 120 }}
            onChange={onMonthChange}
            value={monthDataCurrent}
          >
            {monthData.map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })}
          </Select>
          <RangePicker
            placeholder={['', '']}
            format="DD"
            value={dateDataCurrent}
            onChange={onDateChange}
          ></RangePicker>
        </div>
        <div className="part">
          <div className="partProWrap">
            {showNews.length ? (
              showNews?.map((item: any, index: any) => {
                return (
                  <div className="partProWrapItem" key={index}>
                    {item.Hot ? (
                      <img src={require('@/assets/images/hot.png')} alt="" />
                    ) : (
                      ''
                    )}
                    <div className="partProWrapItemLeft">
                      <div>{getDate(item.StartTime)}</div>
                      <div>{getMonth(item.StartTime)}</div>
                    </div>
                    <div className="partProWrapItemRight">
                      <div>{item.Title}</div>
                      <div>
                        {getWeek(item.StartTime)},{getMonth(item.StartTime)}{' '}
                        {getDate(item.StartTime)},{getTime(item.StartTime)}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="Nodata">
                {/* <img src={require('@/assets/images/nodata.png')} alt="" /> */}
                No Result !
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
