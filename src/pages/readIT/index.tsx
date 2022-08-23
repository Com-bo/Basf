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
  const [checkedTagValues, setCheckedTagValues] = useState<any>([]);
  const [seachTagStr, setSearchTagStr] = useState('');
  const [seachTitleStr, setSeachTitleStr] = useState('');

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

  // 搜索标签
  const onTagSearch = () => {
    setShowTags(
      tagData.filter(
        (x: any) =>
          x.Title.toLowerCase().indexOf(seachTagStr.toLowerCase()) >= 0,
      ),
    );
  };

  // 标签搜索新闻
  const onTagChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedTagValues(checkedValues);
  };

  // 标签和标题检索
  const onTagTitleSearchChild = () => {
    if (checkedTagValues.length) {
      if (seachTitleStr) {
        setShowNews(
          newData
            .filter((x: any) => checkedTagValues.indexOf(x.Tag) >= 0)
            .filter(
              (y: any) =>
                y.Title.toLowerCase().indexOf(seachTitleStr.toLowerCase()) >= 0,
            ),
        );
      } else {
        setShowNews(
          newData.filter((x: any) => checkedTagValues.indexOf(x.Tag) >= 0),
        );
      }
    } else {
      if (seachTitleStr) {
        setShowNews(
          newData.filter(
            (y: any) =>
              y.Title.toLowerCase().indexOf(seachTitleStr.toLowerCase()) >= 0,
          ),
        );
      } else {
        setShowNews(newData);
      }
    }
  };

  // 搜索记录
  const delSearchTitle = (e: any, index: any) => {
    e.stopPropagation();
    const newList = checkedTagValues;
    newList.splice(index, 1);
    setCheckedTagValues([...newList]);
  };

  const onSearchTitle = (item: any) => {
    setSeachTitleStr(item);
  };

  useEffect(() => {
    queryTags();
    queryNewData();
  }, []);

  useEffect(() => {
    if (seachTagStr == '') {
      setShowTags(tagData);
    }
    onTagSearch();
  }, [seachTagStr]);

  useEffect(() => {
    onTagTitleSearchChild();
  }, [seachTitleStr]);

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
                onChange={(e) => {
                  setSearchTagStr(e.target.value);
                }}
              ></Input>
              <img
                onClick={onTagSearch}
                src={require('@/assets/images/search.png')}
                alt=""
              />
            </div>
            <div className="partbox">
              <div className="part1">
                <Checkbox.Group
                  style={{ width: '100%' }}
                  onChange={onTagChange}
                >
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
              <Input
                value={seachTitleStr}
                placeholder="Search"
                onChange={(e) => setSeachTitleStr(e.target.value)}
              ></Input>
              <img
                onClick={onTagTitleSearchChild}
                src={require('@/assets/images/search.png')}
                alt=""
              />
            </div>
            <div className="searchList">
              {checkedTagValues?.map((item: any, index: any) => {
                return (
                  <span
                    className="item"
                    key={index}
                    onClick={() => {
                      onSearchTitle(item);
                    }}
                  >
                    {item}{' '}
                    <CloseOutlined
                      onClick={(e) => {
                        delSearchTitle(e, index);
                      }}
                    />
                  </span>
                );
              })}
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
