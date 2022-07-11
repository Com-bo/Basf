import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './loading.less';
import { Spin } from 'antd';

const Loading = (props?: any) => {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    setTarget(document.getElementById('loading-root') as any);
  }, []);

  return target ? (
    ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      <div
        style={{ zIndex: 10001 }}
        className={`loading-container${props.isLight ? ' light' : ''}  show`}
      >
        <div className="loading">
          <Spin size={'large'} />
        </div>
      </div>,
      // A DOM element
      document.getElementById('loading-root'),
    )
  ) : (
    <div></div>
  );
};

export default Loading;
