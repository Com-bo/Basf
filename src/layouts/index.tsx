import React, { useState, useEffect } from 'react';
import './index.less';
import logo from '@/assets/logo.png';

export default function (props: any) {
  const [title, setTitle] = useState('Procurement  Contract Application Form');
  useEffect(() => {
    console.log(props);
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
