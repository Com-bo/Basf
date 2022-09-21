import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Spin, Dropdown, Menu } from 'antd';

import type { MenuProps, MenuTheme, PaginationProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

import '@/layouts/index';
import {
  DownOutlined,
  RightOutlined,
  LeftOutlined,
  MinusOutlined,
  SearchOutlined,
  FlagOutlined,
  FileTextOutlined,
  TagOutlined,
} from '@ant-design/icons';
const index = (props: any) => {
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      'News Management',
      `${process.env.pagePath}/newsManagement/index`,
      <FileTextOutlined />,
    ),
    getItem(
      'Tags Management',
      `${process.env.pagePath}/tagsManagement/index`,
      <TagOutlined />,
    ),
    getItem(
      'Event Management',
      `${process.env.pagePath}/EventManagement/index`,
      <FlagOutlined />,
    ),
  ];
  const onClickMeau: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    window.location.href = e.key;
  };

  useEffect(() => {}, []);
  return (
    <>
      <Menu
        onClick={onClickMeau}
        style={{ width: 256, fontWeight: 'bold' }}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default index;
