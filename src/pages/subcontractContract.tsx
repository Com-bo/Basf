import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import NewForm from '@/components/subcontractContractForm/newForm';
import EditForm from '@/components/subcontractContractForm/editForm';
import DispForm from '@/components/subcontractContractForm/dispForm';

const index = (props: any) => {
  const getContent = () => {
    console.log(props);
    switch (props?.location?.query?.Action) {
      case 'New':
        return <NewForm />;
      case 'Edit':
        return <EditForm {...props} />;
      case 'View':
        return <DispForm {...props} />;
    }
  };

  useEffect(() => {}, []);

  return <>{getContent()}</>;
};

export default index;
