import { Card } from 'antd';
import helpers from '~/helpers';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import './index.scss';

// rendering ...
function ProductView(props) {
  const {
    className,
    name,
    price,
    avtUrl,
    discount,
    stock,
    action,
    height,
    maxWidth,
  } = props;

  // set height cho các avt của sản phẩm
  useEffect(() => {
    document
      .querySelectorAll('.ant-card-cover')
      .forEach((item) => (item.style.height = `${height / 2}px`));
  }, []);

  // rendering ...
  return (
    <Card
      className={`Product-View pb-4 ${className}`}
      id="card-item"
      style={{ height, maxWidth }}
      loading={false}
      cover={
        <img className="max-w-full max-h-full" src={avtUrl} alt="Product Photo" />
      }
      hoverable>
      {/* Tên sản phẩm */}
      <div className="text-[16px] mb-2 ">
        {helpers.reduceProductName(name)}
      </div>

      {/* Giá sản phẩm */}
      <div className="Product-View-price mb-2">
        {!price && <span className="Product-View-price--contact">Liên hệ</span>}
        {price > 0 && (
          <>
            <span className="Product-View-price--main text-[20px] font-bold">
              {helpers.formatProductPrice(price)}
            </span>
            {discount > 0 && (
              <div>
                <span className="Product-View-price--cancel font-medium">
                  {helpers.formatProductPrice(price + (discount * price) / 100)}
                </span>
                <span className="ml-2 Product-View-price--discount">
                  {discount}%
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Số lượng hàng còn, chỉ hiển thị khi còn ít hơn 5 */}
      {stock <= 5 && stock > 0 && (
        <div className="Product-View-stock text-[14px]">
          chỉ còn {stock} sản phẩm
        </div>
      )}

      {/* Hết hàng tồn kho */}
      {stock === 0 && (
        <b className="Product-View-stock text-[16px]">Đang hết hàng</b>
      )}

      {/* Các nút bấm thêm nếu có */}
      <div className="flex mt-3 justify-content-end">
        {action.length > 0 && action.map((Item) => Item)}
      </div>
    </Card>
  );
}

// default props
ProductView.defaultProps = {
  price: 0,
  stock: 1,
  action: [],
  maxWidth: 280,
  height: 480,
  className: '',
};

// check prop type
ProductView.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  avtUrl: PropTypes.string,
  discount: PropTypes.number,
  stock: PropTypes.number,
  action: PropTypes.any,
  style: PropTypes.object,
  height: PropTypes.number,
  maxWidth: PropTypes.number,
};

export default ProductView;
