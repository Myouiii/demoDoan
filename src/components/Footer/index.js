import {
  FacebookFilled,
  GooglePlusSquareFilled,
  LinkedinFilled,
  PhoneOutlined,
  TwitterSquareFilled,
} from '@ant-design/icons';
import iconPhoneFooter from '~/assets/imgs/icon-phone-footer.png';
import registeredImg from '~/assets/imgs/registered.png';
import React from 'react';
import './index.scss';
function Footer() {
  return (
    <div className="container-fluid bg-white footer px-0" id="footer">
      {/* Liên hệ */}
      <div className="footer-contact py-4">
        <div className="container flex items-center justify-center">
          <PhoneOutlined className="phone-icon" />
          <div className="flex flex-col">
            <h2 className="footer-contact-item">Tư vấn mua hàng</h2>
            <h2 className="footer-contact-item">
              <b>0840.67.9081</b>
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="footer-contact-item">Tư vấn đào tạo</h2>
            <h2 className="footer-contact-item">
              <b>0841.67.9111</b>
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="footer-contact-item">Tư vấn quảng cáo</h2>
            <h2 className="footer-contact-item">
              <b>0842.67.9022</b>
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="footer-contact-item">Hỗ trợ kỹ thuật</h2>
            <h2 className="footer-contact-item">
              <b>090.267.9011</b>
            </h2>
          </div>
        </div>
      </div>
      {/* Thông tin chi tiết */}
      <div className="container py-6">
        <p className="text-center" style={{ color: '#888' }}>
          <span className="font-size-18px">
            CÔNG TY CỔ PHẦN THƯƠNG MẠI - DỊCH VỤ BTT STORE
          </span>
          <br />
          <strong>Trụ sở:</strong>&nbsp;Số 16 VillaD, The Manor, khu đô thị mới
          Mỹ Đình Mễ Trì, Phường 1, Quận 12, Thành phố Hồ Chí Minh
          <br />
          <strong>Văn phòng:</strong>&nbsp; Tầng 16, Tòa Văn phòng, Vincom, số
          54 Nguyễn Chí Thanh, Phường 5, Quận 12, Thành phố Hồ Chí Minh
          <br />
          <strong>Điện&nbsp;thoại:</strong>&nbsp;0840.67.9081 |{' '}
          <strong>Email:</strong>&nbsp;bttstore@gmail.com&nbsp;|{' '}
          <strong>Website:</strong>&nbsp;<a href="/">bttstore.vn</a>
        </p>
        <div className="flex text-center justify-center">
          <img src={registeredImg} width={175} />
          <div className="flex text-center mx-8">
            <img src={iconPhoneFooter} />
            <div className="text-center ml-4">
              <h2 style={{ color: '#CE1F26' }}>Hotline</h2>
              <h2 style={{ color: '#CE1F26' }}>0840.67.9088</h2>
            </div>
          </div>
          <div className="flex">
            <a href="https://fb.com" target="blank">
              <FacebookFilled
                className="px-1 social-item"
                style={{ fontSize: 36, color: '#0C86EF' }}
              />
            </a>
            <a href="https://www.linkedin.com/">
              <LinkedinFilled
                className="px-1 social-item"
                style={{ fontSize: 36, color: '#0073B1' }}
              />
            </a>
            <a href="https://mail.google.com" target="blank">
              {' '}
              <GooglePlusSquareFilled
                className="px-1 social-item"
                style={{ fontSize: 36, color: '#DB5247' }}
              />
            </a>

            <a href="https://twitter.com/" target="blank">
              <TwitterSquareFilled
                className="px-1 social-item"
                style={{ fontSize: 36, color: '#55ACEF' }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
