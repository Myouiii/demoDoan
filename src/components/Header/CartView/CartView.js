import { Avatar, Button, Card, List } from 'antd';
import constants from '../../../constants';
import helpers from '../../../helpers';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const { Meta } = Card;

function totalPrice(list) {
  return list.reduce((total, item) => {
    total += item.price * item.amount;
    return total;
  }, 0);
}

function CartView(props) {
  const { list } = props;
  const length = list.length;
  return (
    <div
      className="bg-white min-w-[20rem] p-2 translate-y-4 shadow-cyan-500/50"
      style={{ backgroundColor: '#fff', height: '500', width: '180' }}>
      <div className="max-h-[20rem] p-8">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={list}
          renderItem={(item) => (
            <Card style={{ width: 300 }}>
              <Meta
                avatar={
                  <Avatar
                    shape="square"
                    style={{ width: 80, height: 50 }}
                    src={item.avt}
                  />
                }
                title={item.name}
                description={`Số lượng: ${item.amount}`}
              />
              <p className="text-center mx-auto mt-3 mb-auto">
                {helpers.formatProductPrice(item.price)}
              </p>
            </Card>
          )}
        />
      </div>

      <div className="p-2">
        <h3>Tổng tiền: {helpers.formatProductPrice(totalPrice(list))}</h3>
        <Link to={length > 0 ? constants.ROUTES.CART : '/'}>
          <Button
            className="block mx-auto my-2 w-full bg-primary border-none"
            type="primary"
            size="large">
            {length > 0 ? 'Đến giỏ hàng' : 'Mua sắm ngay'}
          </Button>
        </Link>
      </div>
    </div>
  );
}

CartView.propTypes = {
  list: PropTypes.array,
};

export default CartView;
