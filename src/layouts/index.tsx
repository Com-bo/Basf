import React, { useState, useEffect } from 'react';
import './index.less';
import logo from '@/assets/logo.png';

export default function (props: any) {
  debugger;
  return (
    <>
      <header className="form_header">
        <div className="form_title">Procurement Contract Application Form</div>
        <div className="form_logo">
          <img src={logo} />
        </div>
      </header>
      <div className="form_content">{props.children}</div>
    </>
  );
}
