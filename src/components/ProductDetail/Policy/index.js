import React from 'react';
import truckIcon from '~/assets/icon/truck_24px.png';
import okIcon from '~/assets/icon/ok_24px.png';
import returnProductIcon from '~/assets/icon/return-product_24px.png';
import truckIcon_2 from '~/assets/icon/truck-2_24px.png';
import wrenchIcon from '~/assets/icon/wrench_24px.png';
import guaranteeIcon from '~/assets/icon/guarantee_24px.png';

function ProductPolicy() {
  return (
    <div className="bg-white p-3 policy">
      <div style={{ color: '#53C303' }} className="mb-1 flex">
        <img src={truckIcon} className="mr-1" />
        Sản phẩm được miến phí giao hàng
      </div>
      <h3 className="font-bold my-2">Chính sách bán hàng</h3>
      <div className="mb-3 flex">
        <img src={okIcon} className="mr-2" />
        Cam kết chính hãng 100%
      </div>
      <div className="mb-3 flex">
        <img src={truckIcon_2} className="mr-1" />
        Miễn phí giao hàng từ 700k
      </div>
      <div className="mb-3 flex">
        <img src={returnProductIcon} className="mr-1" />
        Đổi trả miễn phí trong 7 ngày
      </div>
      <h3 className="font-bold m-tb-12">Dịch vụ thêm</h3>
      <div className="mb-3 flex">
        <img src={guaranteeIcon} className="mr-1" />
        Miễn phí bảo hành tại nhà
      </div>
      <div className="mb-3 flex">
        <img src={wrenchIcon} className="mr-1" />
        Sửa chữa đồng giá 149.000đ
      </div>
    </div>
  );
}

export default ProductPolicy;
