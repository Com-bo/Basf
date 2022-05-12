import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';

const index = () => {
  const [form] = Form.useForm();
  const spService = new SpService();

  return (
    <>
      <Form form={form}>
        <Form.Item name="LeaveType" label={'请假类型'}>
          <Input />
        </Form.Item>
      </Form>
      <Button>提交</Button>
    </>
  );
};

export default index;
