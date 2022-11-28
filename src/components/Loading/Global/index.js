import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

function GlobalLoading(props) {
  return (
    <div className="text-center my-6">
      <Spin
        size="large"
        className="Global-Loading items-center"
        tip={props.content}
      />
    </div>
  );
}

GlobalLoading.defaultProps = {
  content: 'Loading...',
};

GlobalLoading.propTypes = {
  content: PropTypes.string,
};

export default GlobalLoading;
