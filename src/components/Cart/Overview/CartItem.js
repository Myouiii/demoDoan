import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, InputNumber, Tooltip } from 'antd';
import helpers from '~/helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CartItem(props) {
  const {
    _id,
    name,
    code,
    avt,
    stock,
    discount,
    price,
    amount,
    index,
    onDelCartItem,
    onUpdateNumOfProd,
  } = props;
  return (
    <div className="flex bg-white p-3 border justify-between">
      {/* sản phẩm */}
      <div className="flex flex-grow-1">
        <Avatar src={avt} alt="Photo" shape="square" size={64} />
        <div className="flex flex-col p-2">
          <Link to={`/product/${_id}`} className="text-[16px]">
            <Tooltip title={name}>
              {helpers.reduceProductName(name, 20)}
            </Tooltip>
          </Link>
          <span style={{ color: '#aaa' }}>{code}</span>
        </div>
      </div>

      {/*  Thêm giảm sản phẩm */}
      <div className="flex align-i-center items-center" style={{ flexBasis: 128 }}>
        <DeleteOutlined
          className="mr-4 icon-del-item"
          onClick={() => onDelCartItem(index)}
        />
        <div>
          <InputNumber
            height={20}
            min={1}
            max={stock}
            value={amount}
            onChange={(value) => onUpdateNumOfProd(index, value)}
            size="large"
            style={{ borderColor: '#3555C5' }}
          />
        </div>
      </div>

      {/* Giá */}
      <div
        className="flex flex-col items-end"
        style={{ flexBasis: 200 }}>
        <b className="text-[18px]" style={{ color: '#3555C5' }}>
          {helpers.formatProductPrice(price)}
        </b>
        <span style={{ textDecoration: 'line-through', color: '#aaa' }}>
          {helpers.formatProductPrice(price + (price * discount) / 100)}
        </span>
      </div>
    </div>
  );
}

CartItem.defaultProps = {
  _id: '',
  avt: '',
  code: '',
  discount: 0,
  name: '',
  price: 0,
  stock: 0,
  amount: 1,
};

CartItem.propTypes = {
  onDelCartItem: PropTypes.func,
  onUpdateNumOfProd: PropTypes.func,
  index: PropTypes.any,
  _id: PropTypes.string,
  avt: PropTypes.string,
  code: PropTypes.string,
  discount: PropTypes.number,
  amount: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  stock: PropTypes.number,
};

export default CartItem;
