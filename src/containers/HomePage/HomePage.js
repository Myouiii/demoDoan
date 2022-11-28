import { Col, Row } from 'antd';
import AllProduct from './AllProduct';
import "./HomePage.scss"
function Home() {
    document.querySelector('body').scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
    return (
        <div className="Home">
            <Row className="main mx-auto">
                {/* Tổng hợp sản phẩm */}
                <Col span={24} className="mb-8 mt-4 gap-4 bg-white shadow-lg shadow-black/30 rounded-lg">
                    <AllProduct />
                </Col>
            </Row>
        </div>
    );
}

export default Home;