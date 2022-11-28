import { CheckOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Col, Image, InputNumber, message, Rate, Row } from 'antd';
import ImgLoadFailed from '~/assets/imgs/loading-img-failed.png';
import constants from '~/constants/index';
import helpers from '~/helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cartActions from '~/reducers/carts';
import './index.scss';

// Hàm đếm số sản phẩm đó trong giỏ hàng
function countItemInCart(productCode, carts) {
  let count = 0;
  if (carts) {
    carts.forEach((item) => {
      if (item.code === productCode) count += item.amount;
    });
  }
  return count;
}

function ProductOverview(props) {
  const { products } = props;
  const {
    _id,
    avt,
    name,
    brand,
    code,
    price,
    rate,
    discount,
    stock,
  } = products.product;

  const { catalogs, ...productRest } = products.productDetail;
  const imgList = [avt, ...catalogs];
  const rateTotal = rate.reduce((a, b) => a + b, 0);
  const priceBefore = price + (price * discount) / 100;
  const rateAvg = helpers.calStar(rate);

  const [numOfProduct, setNumberOfProduct] = useState(1);
  const [avtIndex, setAvtIndex] = useState(0);
  const carts = useSelector((state) => state.carts);
  const currentStock = stock - countItemInCart(code, carts);

  const dispatch = useDispatch();

  // fn: hiên thị danh sách hình ảnh sp
  const showCatalogs = (catalog) => {
    return catalog.map((item, index) => (
      <Image
        key={index}
        src={item}
        width={48}
        className={`catalog-item p-1 ${index === avtIndex ? 'active' : ''}`}
        onMouseEnter={() => setAvtIndex(index)}
      />
    ));
  };

  // fn: hiển thị vài thông tin cơ bản của sản phẩm
  const showOverviewInfo = (product) => {
    let result = [];
    let i = 0;
    for (let key in product) {
      if (i >= 5) break;
      if (typeof product[key] === 'string') {
        result.push(
          <p key={i++} className="mb-2">
            {`- ${helpers.convertProductKey(key)}: ${product[key]}`}
          </p>,
        );
      }
    }
    return result;
  };

  // fn: Thêm vào giỏ hàng
  const addCart = () => {
    let product = {
      code,
      name,
      price,
      amount: numOfProduct,
      avt,
      discount,
      stock,
      _id,
    };
    setNumberOfProduct(1);
    dispatch(cartActions.addToCart(product));
    message.success('Thêm vào giỏ hàng thành công');
  };

  // rendering ...
  return (
    <Row className="Product-Overview bg-white p-4">
      {/* Hình ảnh và thông số cơ bản sản phẩm */}
      <Col span={24} md={8}>
        <div
          style={{ height: 268 }}
          className="flex items-center justify-center ">
          <Image
            style={{ maxHeight: '20%' }}
            fallback={ImgLoadFailed}
            src={imgList[avtIndex]}
          />
        </div>
        <div className="flex w-full bg-white pb-4 pt-4">
          {showCatalogs(imgList)}
        </div>
        <div className="pl-4 pt-4 product-info">
          {showOverviewInfo(productRest)}
        </div>
      </Col>

      {/* Tên và thông tin cơ bản */}
      <Col span={24} md={16} className="pl-4">
        {/* Tên sp */}
        <h2 className="text-[24px] font-bold">
          {helpers.reduceProductName(name, 140)}
        </h2>

        {/* Đánh giá sản phẩm */}
        <div className="py-2">
          <Rate disabled defaultValue={rateAvg} allowHalf />
          <a href="#evaluation" className="ml-2">
            (Có {rateTotal} đánh giá)
          </a>
        </div>

        {/* Mã, thương hiệu */}
        <div
          className="text-[16px] font-medium"
          style={{ color: '#aaa' }}>
          Thương hiệu:
          <span className="product-brand font-semibold">&nbsp;{brand}</span>
          &nbsp; | &nbsp;<span>{code}</span>
        </div>

        {/* Giá */}
        <h1 className="product-price font-bold py-2">
          {price === 0 ? 'Liên hệ' : helpers.formatProductPrice(priceBefore)}
        </h1>
        {discount > 0 && price > 0 && (
          <>
            <h3 className="font-bold" style={{ color: '#333' }}>
              Bạn có 1 mã giảm giá {discount}% cho sản phẩm này
            </h3>
            <div className="flex flex-col mt-2 mb-4 py-2 px-4 discount">
              <span className="discount-price text-[16px] font-bold">
                Giá: {helpers.formatProductPrice(price)}
              </span>
              <span>
                Đã giảm thêm: {helpers.formatProductPrice(priceBefore - price)}
                &nbsp;
                <span className="discount-decr"></span>
              </span>
              <div className="discount-mark"></div>
              <CheckOutlined className="discount-mark-icon" />
            </div>
          </>
        )}

        {/* Chọn số lượng */}
        <div className="pt-3 option">
          {currentStock === 0 ? (
            <h2 className="mx-2 mt-2 text[18px] font-medium" style={{ color: 'red' }}>
              <i>Sản phẩm hiện đang hết hàng !</i>
            </h2>
          ) : (
            <>
              <h3 className="mx-2 mt-2 text[16px]">Chọn số lượng: </h3>
              <InputNumber
                name="numOfProduct"
                size="middle"
                value={numOfProduct}
                min={1}
                max={currentStock}
                onChange={(value) => setNumberOfProduct(value)}
              />
            </>
          )}
        </div>

        {/* Button*/}
        {price > 0 && currentStock > 0 ? (
          <div className="btn-group py-4 flex justify-around">
            <Button
              onClick={addCart}
              disabled={stock ? false : true}
              size="large"
              className="mr-4 w-full btn-group-item"
              style={{ backgroundColor: '#3555c5' }}>
              THÊM GIỎ HÀNG
            </Button>

            <Button
              onClick={addCart}
              disabled={stock ? false : true}
              size="large"
              className="w-full btn-group-item"
              style={{ backgroundColor: '#39B3D7' }}>
              <Link to={constants.ROUTES.PAYMENT}> MUA NGAY LUÔN</Link>
            </Button>
          </div>
        ) : (
          <Button
            size="large"
            className="my-4 w-full btn-group-item"
            style={{ backgroundColor: '#3555c5' }}>
            <a href="https://fb.com/" target="blank">
              <PhoneOutlined style={{ fontSize: 18 }} className="mr-2" /> LIÊN
              HỆ
            </a>
          </Button>
        )}
      </Col>
    </Row>
  );
}

ProductOverview.propTypes = {
  products: PropTypes.object,
};

export default ProductOverview;
