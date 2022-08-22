import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, Space } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import NewForm from '@/components/generalPurchaseForm/newForm';
import EditForm from '@/components/generalPurchaseForm/editForm';
import DispForm from '@/components/generalPurchaseForm/dispForm';

import './style.less';
import avatar from '@/assets/images/avatar.png';
import { DownOutlined, RightOutlined, MinusOutlined } from '@ant-design/icons';
import { getFileInfo } from 'prettier';
const index = (props: any) => {
  const [robotMark, setRobotMark] = useState(true);
  const getContent = () => {
    console.log(props);
    switch (props?.location?.query?.Action) {
      case 'New':
        return <NewForm />;
      case 'Edit':
        return <EditForm />;
      case 'View':
        return <DispForm {...props} />;
    }
  };
  const getInfo = () => {
    var Flag = !robotMark;
    setRobotMark(Flag);
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="header">
        <div className="headerTitle">
          <ul>
            <li className="active">
              <a>Home</a>
            </li>
            <li>
              <a>Read IT</a>
            </li>
            <li>
              <a>Event Calendar</a>
            </li>
            <li>
              <a>Digital Academy</a>
            </li>
            <li>
              <a>Solution Gallery</a>
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
      </div>
      <div className="bodypart">
        <div className="part">
          <div className="partLeft">
            <div className="partTitle">Read IT</div>
            <div className="partbox part1">
              <div className="partProWrap">
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/pro1.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award
                    </div>
                    <div className="partProWrapItemTitleDate">2022-07-02</div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/pro1.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award BASF researchers
                      receive R&D award
                    </div>
                    <div className="partProWrapItemTitleDate">2022-07-02</div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/pro1.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award
                    </div>
                    <div className="partProWrapItemTitleDate">2022-07-02</div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <img src={require('@/assets/images/pro1.png')} alt="" />
                  <div className="partProWrapItemWrap">
                    <div className="partProWrapItemTitle">
                      BASF researchers receive R&D award
                    </div>
                    <div className="partProWrapItemTitleDate">2022-07-02</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="partRight">
            <div className="partTitle">Read IT Tags</div>
            <div className="partbox">
              <div className="part1">
                <div className="partpro">Power BI</div>
                <div className="partpro">SAP</div>

                <div className="partpro">SAP</div>

                <div className="partpro">Power BI</div>

                <div className="partpro">Power BI</div>
                <div className="partpro">SAP</div>

                <div className="partpro">SAP</div>
                <div className="partpro">Power BI</div>
                <div className="partpro">Power BI</div>
                <div className="partpro">SAP</div>
                <div className="partpro">SAP</div>
                <div className="partpro">Power BI</div>
                <div className="partpro">Power BI</div>
              </div>
            </div>
          </div>
        </div>
        <div className="part">
          <div className="partLeft">
            <div className="partTitle">Event Calendar</div>
            <div className="partbox part2">
              <div className="partProWrap">
                <div className="partProWrapItem">
                  <div className="partProWrapItemLeft">
                    <div>8</div>
                    <div>jun</div>
                  </div>
                  <div className="partProWrapItemRight">
                    <div>PAD SAP Scripts and Beginning</div>
                    <div>Tue, Jun 8, 09:30</div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <div className="partProWrapItemLeft">
                    <div>8</div>
                    <div>jun</div>
                  </div>
                  <div className="partProWrapItemRight">
                    <div>PAD SAP Scripts and Beginning</div>
                    <div>Tue, Jun 8, 09:30</div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <div className="partProWrapItemLeft">
                    <div>8</div>
                    <div>jun</div>
                  </div>
                  <div className="partProWrapItemRight">
                    <div>PAD SAP Scripts and Beginning</div>
                    <div>Tue, Jun 8, 09:30</div>
                  </div>
                </div>
                <div className="partProWrapItem">
                  <div className="partProWrapItemLeft">
                    <div>8</div>
                    <div>jun</div>
                  </div>
                  <div className="partProWrapItemRight">
                    <div>PAD SAP Scripts and Beginning</div>
                    <div>Tue, Jun 8, 09:30</div>
                  </div>
                </div>
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
                    <div className="search">
                      <input type="text" />
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
                    <div className="partOperateText">
                      <div className="partOperateTextItem">
                        <img
                          src={require('@/assets/images/icon2.png')}
                          alt=""
                        />
                        <div>Trainer Pool</div>
                      </div>
                      <div className="partOperateTextItem">
                        <img
                          src={require('@/assets/images/icon1.png')}
                          alt=""
                        />
                        <div>Course Management</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="partRight">
            <div className="partTitle">Yammer</div>
            <div className="partbox">
              <div className="part2">
                <textarea name=""></textarea>
                <div className="buttonWrap">
                  <Space>
                    Add:
                    <img src={require('@/assets/images/aite.png')} alt="" />
                    <img src={require('@/assets/images/lianjie.png')} alt="" />
                    <img src={require('@/assets/images/tupian.png')} alt="" />
                  </Space>
                  <div className="updateButton">Update</div>
                </div>
                <div className="commentBox">
                  <div className="comment mainComment">
                    <div className="commentLeft">
                      <img src={avatar} alt="" />
                    </div>
                    <div className="commentRight">
                      <div className="commentName">Jasmine Sokko:</div>
                      <div className="commentTitle">
                        How to set the font of the email body?
                      </div>
                      <div className="commentInfo">
                        <div className="datewrap">
                          <div className="date">8 hours ago</div>
                          <div className="Reply">Reply</div>
                        </div>
                        <div>
                          <img
                            src={require('@/assets/images/share.png')}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="comment defaultComment">
                    <div className="commentLeft">
                      <img src={avatar} alt="" />
                    </div>
                    <div className="commentRight">
                      <div className="commentName">Jasmine Sokko:</div>
                      <div className="commentTitle">
                        How to set the font of the email body?
                      </div>
                      <div className="commentInfo">
                        <div className="datewrap">
                          <div className="date">8 hours ago</div>
                          <div className="Reply">Reply</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {robotMark ? (
        <div className="robotDiv" onClick={getInfo}>
          <img src={require('@/assets/images/robot.png')} alt="" />
        </div>
      ) : (
        ''
      )}

      {robotMark ? (
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
          </div>
        </div>
      )}
    </>
  );
};

export default index;
