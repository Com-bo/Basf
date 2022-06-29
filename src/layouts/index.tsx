import React, { useState, useEffect } from 'react';
import './index.less';
import logo from '@/assets/logo.png';
const _config: any = {
  subcontractContract: {
    title: 'Subcontract  Contract Application Form',
  },
};
export default function (props: any) {
  const [title, setTitle] = useState('Procurement  Contract Application Form');

  useEffect(() => {
    let _key = props.location.pathname.slice(1);
    if (_config[_key]) {
      setTitle(_config[_key]?.title);
    }
  }, []);
  return (
    <>
      <header className="form_header">
        <div className="form_title">{title}</div>
        <div className="form_logo">
          <img src={logo} />
        </div>
      </header>
      <div className="form_content">{props.children}</div>
    </>
  );
}
