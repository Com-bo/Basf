import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, Space, Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import NewForm from '@/components/generalPurchaseForm/newForm';
import EditForm from '@/components/generalPurchaseForm/editForm';
import DispForm from '@/components/generalPurchaseForm/dispForm';

import BasfHeader from '@/components/Header';

import FormService from '@/services/form.service';
import { DownOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

const index = (props: any) => {
  const formService = new FormService();
  const [newData, setNewData] = useState<any>([]);
  const [showNews, setShowNews] = useState<any>([]);
  const [tagData, setTagData] = useState<any>([]);
  const [showTags, setShowTags] = useState(Array<any>());
  const [searchTagData, setSearchTagData] = useState<any>([]);
  const [newDataTagInput, setNewDataTagInput] = useState<String>('');
  const [seachTagStr, setSearchTagStr] = useState('');

  // const _getTags = async () => {
  //   try {
  //     const TagOnline = await formService.getTableDataAll('Tag', []);
  //     setTagData(TagOnline)
  //     queryNewData();
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

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
      setShowNews(res);
    });
  };

  const onTagSearch = () => {
    setShowTags(tagData.filter((x: any) => x.Title.indexOf(seachTagStr) >= 0));
  };

  const getTableDataAllPromise = (item: any) => {
    return new Promise((resolve, reject) => {
      formService
        .getTableDataAll('News', [
          {
            type: 'filter eq',
            value: item,
            properties: ['Tag'],
          },
        ])
        .then((res) => {
          resolve(res);
        });
    });
  };

  const tagSearch = async () => {};
  const newDataTagInputClick = (e: any) => {
    setNewDataTagInput(e.target.value);
  };

  useEffect(() => {
    queryTags();
    queryNewData();
  }, []);

  useEffect(() => {
    if (seachTagStr == '') {
      setShowTags(tagData);
    } else {
      setShowTags(
        tagData.filter((x: any) => x.Title.indexOf(seachTagStr) >= 0),
      );
    }
  }, [seachTagStr]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setShowNews(newData.filter((x: any) => checkedValues.indexOf(x.Tag) >= 0));
    if (!checkedValues.length) {
      setShowNews(newData);
    }
  };

  return (
    <>
      <BasfHeader></BasfHeader>
      <div className="headerArticle">
        <img src={require('@/assets/images/readIt_01.png')} alt="" />
      </div>
      <div className="readItPart">
        <div className="part">
          <div className="partLeft">
            <div className="partTitle">Read IT Tags</div>
            <div className="search">
              <Input
                value={seachTagStr}
                placeholder="Search"
                onChange={(e) => setSearchTagStr(e.target.value)}
              ></Input>
              <img
                onClick={onTagSearch}
                src={require('@/assets/images/search.png')}
                alt=""
              />
            </div>
            <div className="partbox">
              <div className="part1">
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                  <Row>
                    {showTags?.map((item: any, index: any) => {
                      return (
                        <Col span={24} key={index}>
                          <Checkbox value={item.Title}>{item.Title}</Checkbox>
                        </Col>
                      );
                    })}
                  </Row>
                </Checkbox.Group>
              </div>
            </div>
          </div>
          <div className="partRight">
            <div className="search">
              <input type="text" placeholder="Search" />
              <img src={require('@/assets/images/search.png')} alt="" />
            </div>
            <div className="searchList">
              <span className="item">
                AAAAAAA <CloseOutlined />
              </span>
              <span className="item">
                AAAAAAA <CloseOutlined />
              </span>
              <span className="item">
                AAAAAAA <CloseOutlined />
              </span>
              <span className="item">
                AAAAAAA <CloseOutlined />
              </span>
            </div>
            <div className="partbox part1">
              <div className="partProWrap">
                {showNews?.map((item: any, index: any) => (
                  <div className="partProWrapItem" key={index}>
                    <img src={require('@/assets/images/pro1.png')} alt="" />
                    <div className="partProWrapItemWrap">
                      <div className="partProWrapItemTitleDate">
                        {item.PublishDate && moment(item.PublishDate).isValid()
                          ? moment(item.PublishDate).format('YYYY-MM-DD')
                          : item.PublishDate}
                      </div>
                      <div className="partProWrapItemTitle">{item.Title}</div>
                      <div className="ProTag">{item.Tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
