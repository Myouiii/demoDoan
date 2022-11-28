import { Button } from 'antd';
import constants from '~/constants/index';
import helpers from '~/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CartPayment(props) {
  const { carts, isCheckout, transportFee, onCheckout, isLoading } = props;
  // giá tạm tính
  const tempPrice = carts.reduce(
    (a, b) => a + (b.price + (b.price * b.discount) / 100) * b.amount,
    0,
  );
  // tổng khuyến mãi
  const totalDiscount = carts.reduce(
    (a, b) => a + ((b.price * b.discount) / 100) * b.amount,
    0,
  );

  // rendering ...
  return (
    <div className="Payment bg-white p-4">
      <h2 className="mb-2">Tiến hành thanh toán</h2>
      <div className="flex justify-between mb-2">
        <span className="text-[16px]" style={{ color: '#aaa' }}>
          Tạm tính
        </span>
        <b>{helpers.formatProductPrice(tempPrice)}</b>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-[16px]" style={{ color: '#aaa' }}>
          Phí vận chuyển
        </span>
        <b>{helpers.formatProductPrice(transportFee)}</b>
      </div>
      <div className="flex justify-between mb2">
        <span className="text-[16px]" style={{ color: '#aaa' }}>
          Giảm giá
        </span>
        <b>{helpers.formatProductPrice(totalDiscount)}</b>
      </div>
      <div className="flex justify-between">
        <span className="text-[16px]" style={{ color: '#aaa' }}>
          Thành tiền
        </span>
        <b style={{ color: 'red', fontSize: 20 }}>
          {helpers.formatProductPrice(tempPrice - totalDiscount + transportFee)}
        </b>
      </div>
      <div className="text-end">
        <span
          style={{ color: '#aaa', fontSize: 16 }}>{`(Đã bao gồm VAT)`}</span>
      </div>

      {isCheckout ? (
        <Button
          onClick={onCheckout}
          className="mt-4 block mx-auto w-full"
          type="primary"
          size="large"
          loading={isLoading}
          style={{ backgroundColor: '#3555c5', color: '#fff' }}>
          ĐẶT HÀNG NGAY
        </Button>
      ) : (
        <Link to={constants.ROUTES.PAYMENT}>
          <Button
            className="mt-4 block mx-auto w-full"
            type="primary"
            size="large"
            style={{ backgroundColor: '#3555c5', color: '#fff' }}>
            THANH TOÁN
          </Button>
        </Link>
      )}
    </div>
  );
}

CartPayment.defaultProps = {
  carts: [],
  isCheckout: false, // cờ kiểm tra có phải ở trang checkout để lập đơn hàng hay k
  transportFee: 0,
  isLoading: false,
};

CartPayment.propTypes = {
  carts: PropTypes.array,
  isCheckout: PropTypes.bool,
  transportFee: PropTypes.number,
  onCheckout: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CartPayment;
