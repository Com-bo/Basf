import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button } from 'antd';
import SpService from '@/services/sharepoint.service';
import moment from 'moment';
import NewForm from '@/components/leaseEstateContractForm/newForm';
import EditForm from '@/components/leaseEstateContractForm/editForm';
import DispForm from '@/components/leaseEstateContractForm/dispForm';

const index = (props: any) => {
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

  useEffect(() => {}, []);

  return <>{getContent()}</>;
};

export default index;
