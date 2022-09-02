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
  const [SolutionLink, setSolutionLink] = useState<any>([
    'https://apps.powerapps.com/play/e/b240154e-fa0f-45e9-b470-5d6d1c29d82d/a/194ab89b-0179-4800-b341-5b7b7de03a76?tenantId=ecaa386b-c8df-4ce0-ad01-740cbdb5ba55&source=portal',
    'https://basf.sharepoint.com/sites/learn-together   ',
  ]);
  const shift = () => {
    window.location.href = `${process.env.pagePath}/newsManagement/index`;
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://serviceme.sharepoint.com/sites/Gate2Digital/Lists/Event/AllItems.aspx"
            >
              Settings
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={shift}>
              Maintain
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
                <a href={`${process.env.pagePath}/readIT/index`}>News</a>
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
                {/* <a href={`${process.env.pagePath}/DigitalAcademy/index`}>
                  Digital Academy
                </a> */}
                <a href={SolutionLink[0]}>Digital Academy</a>
              </li>
              <li
                className={
                  urlMark == `${process.env.pagePath}/SolutionGallery/index`
                    ? 'active'
                    : ''
                }
              >
                {/* <a href={`${process.env.pagePath}/SolutionGallery/index`}>
                  Solution Gallery
                </a> */}
                <a href={SolutionLink[1]}>Solution Gallery</a>
              </li>
            </ul>
          </div>
          <div className="headerInfo">
            <div className="headerAvatar">
              <img src={avatar} alt="" />
            </div>
            <div className="headerName">Joe Zhou</div>
            <Dropdown overlay={menu} placement="bottom" arrow>
              <DownOutlined style={{ color: '#ffffff', cursor: 'pointer' }} />
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
