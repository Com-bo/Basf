import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, Space } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import NewForm from '@/components/generalPurchaseForm/newForm';
import EditForm from '@/components/generalPurchaseForm/editForm';
import DispForm from '@/components/generalPurchaseForm/dispForm';

import '@/layouts/index';
import avatar from '@/assets/images/avatar.png';
import { DownOutlined, RightOutlined, MinusOutlined } from '@ant-design/icons';
const index = (props: any) => {
  const [urlMark, setUrlMark] = useState('');
  useEffect(() => {
    console.log(window.location.pathname);
    setUrlMark(window.location.pathname);
  }, []);
  return (
    <>
      <div className="header">
        <div className="headerTitle">
          <ul>
            <li className={urlMark == '/home/index' ? 'active' : ''}>
              <a href="/">Home</a>
            </li>
            <li className={urlMark == '/readIT/index' ? 'active' : ''}>
              <a href="/readIT/index">Read IT</a>
            </li>
            <li className={urlMark == '/EventCalendar/index' ? 'active' : ''}>
              <a href="/EventCalendar/index">Event Calendar</a>
            </li>
            <li className={urlMark == '/DigitalAcademy/index' ? 'active' : ''}>
              <a href="/DigitalAcademy/index">Digital Academy</a>
            </li>
            <li className={urlMark == '/SolutionGallery/index' ? 'active' : ''}>
              <a href="/SolutionGallery/index">Solution Gallery</a>
            </li>
          </ul>
          <div className="headerInfo">
            <div className="headerAvatar">
              <img src={avatar} alt="" />
            </div>
            <div className="headerName">Joe Zhou</div>
            <DownOutlined style={{ color: '#ffffff' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
