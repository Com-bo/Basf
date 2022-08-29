import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, Space, Spin, Dropdown, Menu } from 'antd';
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
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="">
              Settings
            </a>
          ),
        },
      ]}
    />
  );
  useEffect(() => {
    console.log(window.location.pathname);
    setUrlMark(window.location.pathname);
  }, []);
  return (
    <>
      <div className="header">
        <div className="headerTitle">
          <div className="headerLogo">
            <div className="logoName">
              <img src={require('@/assets/images/mylogo.png')} alt="" />
            </div>
            <ul>
              <li
                className={
                  urlMark == `${process.env.pagePath}/home/index`
                    ? 'active'
                    : ''
                }
              >
                <a href={`${process.env.pagePath}/home/index`}>Home</a>
              </li>
              <li
                className={
                  urlMark == `${process.env.pagePath}/readIT/index`
                    ? 'active'
                    : ''
                }
              >
                <a href={`${process.env.pagePath}/readIT/index`}>Read IT</a>
              </li>
              <li
                className={
                  urlMark == `${process.env.pagePath}/EventCalendar/index`
                    ? 'active'
                    : ''
                }
              >
                <a href={`${process.env.pagePath}/EventCalendar/index`}>
                  Event Calendar
                </a>
              </li>
              <li
                className={
                  urlMark == `${process.env.pagePath}/DigitalAcademy/index`
                    ? 'active'
                    : ''
                }
              >
                <a href={`${process.env.pagePath}/DigitalAcademy/index`}>
                  Digital Academy
                </a>
              </li>
              <li
                className={
                  urlMark == `${process.env.pagePath}/SolutionGallery/index`
                    ? 'active'
                    : ''
                }
              >
                <a href={`${process.env.pagePath}/SolutionGallery/index`}>
                  Solution Gallery
                </a>
              </li>
            </ul>
          </div>
          <div className="headerInfo">
            <div className="headerAvatar">
              <img src={avatar} alt="" />
            </div>
            <div className="headerName">Joe Zhou</div>
            <Dropdown overlay={menu} placement="bottom" arrow>
              <DownOutlined style={{ color: '#ffffff' }} />
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
