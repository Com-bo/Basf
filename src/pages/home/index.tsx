import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, Space } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import NewForm from '@/components/generalPurchaseForm/newForm';
import EditForm from '@/components/generalPurchaseForm/editForm';
import DispForm from '@/components/generalPurchaseForm/dispForm';

import BasfHeader from '@/components/Header';

import avatar from '@/assets/images/avatar.png';
import FormService from '@/services/form.service';
import { DownOutlined, RightOutlined, MinusOutlined } from '@ant-design/icons';
import { getFileInfo } from 'prettier';
const index = (props: any) => {
  const formService = new FormService();
  const [robotMark, setRobotMark] = useState(true);
  const [newData, setNewData] = useState<any>([]);
  const [showNews, setShowNews] = useState<any>([]);
  const [tagData, setTagData] = useState<any>([]);
  const [showTags, setShowTags] = useState(Array<any>());
  const [eventData, setEventData] = useState<any>([]);
  const [showEvent, setShowEvent] = useState(Array<any>());
  //获取tag
  const queryTags = () => {
    formService.getTableDataAll('Tag', []).then((res) => {
      setTagData(res);
      setShowTags(res);
    });
  };

  //获取新闻信息
  const queryNewData = () => {
    formService.getTableDataAll('News', []).then((res) => {
      setNewData(res);
      setShowNews(res.slice(0, 4));
    });
  };

  //获取活动数据
  const queryEventData = () => {
    formService.getTableDataAll('Event', []).then((res) => {
      setEventData(res);
      setShowEvent(res.slice(0, 4));
    });
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

  const getInfo = () => {
    var Flag = !robotMark;
    setRobotMark(Flag);
  };
  useEffect(() => {
    queryTags();
    queryNewData();
    queryEventData();
  }, []);

  return (
    <>
      <BasfHeader></BasfHeader>
      <div className="headerArticle">
        <img src={require('@/assets/images/header.png')} alt="" />
        <div className="headerArticleWrap">
          <div className="headerArticleText">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever.
          </div>
          <div className="headerArticleMore">
            more
            <RightOutlined />
          </div>
        </div>
      </div>
      <div className="bodypart">
        <div className="part">
          <div className="partLeft">
            <div className="partTitle">Read IT</div>
            <div className="partbox part1">
              <div className="partProWrap">
                {showNews?.map((item: any, index: any) => {
                  return (
                    <div className="partProWrapItem">
                      <img src={require('@/assets/images/pro1.png')} alt="" />
                      <div className="partProWrapItemWrap">
                        <div className="partProWrapItemTitle">{item.Title}</div>
                        <div className="partProWrapItemTitleDate">
                          {item.PublishDate &&
                          moment(item.PublishDate).isValid()
                            ? moment(item.PublishDate).format('YYYY-MM-DD')
                            : item.PublishDate}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="partRight">
            <div className="partTitle">Read IT Tags</div>
            <div className="partbox">
              <div className="part1">
                {showTags?.map((item: any, index: any) => {
                  return (
                    <div className="partpro" key={index}>
                      {item.Title}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="part">
          <div className="partLeft">
            <div className="partTitle">
              <div className="partTitleHeadLine">Event Calendar</div>
              <div className="partTitleMore">
                More
                <RightOutlined />
              </div>
            </div>
            <div className="partbox part2">
              <div className="partProWrap">
                {showEvent?.map((item: any, index: any) => {
                  return (
                    <div className="partProWrapItem" key={index}>
                      {item.Hot ? (
                        <img src={require('@/assets/images/Hot.png')} alt="" />
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
                })}
              </div>
              <div className="partOperate">
                <div className="partOperateItem">
                  <img
                    className="bgimg"
                    src={require('@/assets/images/tit2.png')}
                    alt=""
                  />
                  <div className="partOperateTitle">
                    <div className="partOperateTit">Solution Gallery</div>
                    <a href="">
                      Click To View <RightOutlined />{' '}
                    </a>
                    <div className="search">
                      <img src={require('@/assets/images/serach.png')} alt="" />
                    </div>
                  </div>
                </div>
                <div className="partOperateItem">
                  <img
                    className="bgimg"
                    src={require('@/assets/images/tit1.png')}
                    alt=""
                  />
                  <div className="partOperateTitle">
                    <img src={require('@/assets/images/logo.png')} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="partRight">
            <div className="partTitle">Chatbot</div>
            <div className="partbox">
              <div className="part2">
                <div className="qaInfoArticle">
                  <img
                    className="robotName"
                    src={require('@/assets/images/robot1.png')}
                    alt=""
                  />
                  <div className="qaInfoTime">3:18</div>
                  <div className="conversationList">
                    <div className="conversation conversationYou">
                      <div className="conversationInfo">
                        Hi,I am your G2D ,ask me something.
                      </div>
                    </div>
                    <div className="conversation conversationMe">
                      <div className="conversationInfo">
                        Hi,I am your G2D ,ask me something.
                      </div>
                    </div>
                  </div>
                  <div className="conversationEnter">
                    <textarea placeholder="Please Enter"></textarea>
                    <div>
                      <img src={require('@/assets/images/send.png')} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {robotMark ? (
        <div className="robotDiv" onClick={getInfo}>
          <img src={require('@/assets/images/robot.png')} alt="" />
        </div>
      ) : (
        ''
      )} */}

      {/* {robotMark ? (
        ''
      ) : (
        <div className="qaInfo">
          <div className="qaInfoTitle">
            <div className="qaInfoTit">little Assistant</div>
            <MinusOutlined onClick={getInfo} />
          </div>
          <div className="qaInfoArticle">
            <div className="qaInfoTime">3:18</div>
            <div className="conversationList">
              <div className="conversation conversationYou">
                <div className="conversationAvatar">
                  <img src={require('@/assets/images/robothead.png')} alt="" />
                </div>
                <div className="conversationInfo">
                  Hi,I am your G2D assistance,ask me something.
                </div>
              </div>
              <div className="conversation conversationMe">
                <div className="conversationAvatar">
                  <img src={require('@/assets/images/user.png')} alt="" />
                </div>
                <div className="conversationInfo">
                  Hi,I am your G2D assistance,ask me something.
                </div>
              </div>
            </div>
            <div className="conversationEnter">
              <textarea placeholder="Please Enter"></textarea>
              <div>
                <img src={require('@/assets/images/send.png')} alt="" />
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default index;