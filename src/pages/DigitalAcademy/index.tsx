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
import {
  DownOutlined,
  RightOutlined,
  CloseOutlined,
  UserOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { getFileInfo } from 'prettier';
const index = (props: any) => {
  useEffect(() => {}, []);
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
  return (
    <>
      <BasfHeader></BasfHeader>
      <div className="headerArticle">
        <img src={require('@/assets/images/event.png')} alt="" />
      </div>

      <div className="digitalAcademy">
        <div className="part">
          <div className="partLeft">
            <div className="partTitle">
              <div className="partTitleHeadLine">Course Management</div>
              <div className="partTitleMore">
                More
                <RightOutlined />
              </div>
            </div>
            <div className="partbox part1">
              <div className="partProWrap">
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/detail.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award Course Title Course
                      Title Course Title Course Title
                    </div>
                    <div className="partProWrapItemTitledetail">
                      <div className="partProWrapItemTitleDate">2022-07-02</div>
                      <div className="partProWrapItemComment">
                        <CommentOutlined /> 999+
                      </div>
                    </div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/detail.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award Course Title Course
                      Title Course Title Course Title
                    </div>
                    <div className="partProWrapItemTitledetail">
                      <div className="partProWrapItemTitleDate">2022-07-02</div>
                      <div className="partProWrapItemComment">
                        <CommentOutlined /> 999+
                      </div>
                    </div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/detail.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award Course Title Course
                      Title Course Title Course Title
                    </div>
                    <div className="partProWrapItemTitledetail">
                      <div className="partProWrapItemTitleDate">2022-07-02</div>
                      <div className="partProWrapItemComment">
                        <CommentOutlined /> 999+
                      </div>
                    </div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/detail.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award Course Title Course
                      Title Course Title Course Title
                    </div>
                    <div className="partProWrapItemTitledetail">
                      <div className="partProWrapItemTitleDate">2022-07-02</div>
                      <div className="partProWrapItemComment">
                        <CommentOutlined /> 999+
                      </div>
                    </div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/detail.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award Course Title Course
                      Title Course Title Course Title
                    </div>
                    <div className="partProWrapItemTitledetail">
                      <div className="partProWrapItemTitleDate">2022-07-02</div>
                      <div className="partProWrapItemComment">
                        <CommentOutlined /> 999+
                      </div>
                    </div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/detail.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award Course Title Course
                      Title Course Title Course Title
                    </div>
                    <div className="partProWrapItemTitledetail">
                      <div className="partProWrapItemTitleDate">2022-07-02</div>
                      <div className="partProWrapItemComment">
                        <CommentOutlined /> 999+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="partRight">
            <div className="partTitle">
              <div className="partTitleHeadLine">
                Trainer Pool
                <span>Top4</span>
              </div>
              <div className="partTitleMore">
                More
                <RightOutlined />
              </div>
            </div>
            <div className="partbox part1">
              <div className="trainerPoll">
                <div className="trainerPollItem">
                  <div className="trainerAvatar">
                    <img src={require('@/assets/images/avatar.png')} alt="" />
                  </div>
                  <div className="trainerName">Season Beasley</div>
                  <div className="trainerSummary">Makreting</div>
                  <div className="trainerDetail">
                    Net Maketing Production Interface Upgrade
                  </div>
                </div>
                <div className="trainerPollItem">
                  <div className="trainerAvatar">
                    <img src={require('@/assets/images/avatar.png')} alt="" />
                  </div>
                  <div className="trainerName">Season Beasley</div>
                  <div className="trainerSummary">Makreting</div>
                  <div className="trainerDetail">
                    Net Maketing Production Interface Upgrade
                  </div>
                </div>
                <div className="trainerPollItem">
                  <div className="trainerAvatar">
                    <img src={require('@/assets/images/avatar.png')} alt="" />
                  </div>
                  <div className="trainerName">Season Beasley</div>
                  <div className="trainerSummary">Makreting</div>
                  <div className="trainerDetail">
                    Net Maketing Production Interface Upgrade
                  </div>
                </div>
                <div className="trainerPollItem">
                  <div className="trainerAvatar">
                    <img src={require('@/assets/images/avatar.png')} alt="" />
                  </div>
                  <div className="trainerName">Season Beasley</div>
                  <div className="trainerSummary">Makreting</div>
                  <div className="trainerDetail">
                    Net Maketing Production Interface Upgrade
                  </div>
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
