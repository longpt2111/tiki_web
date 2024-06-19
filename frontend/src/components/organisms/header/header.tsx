import { Col, Row } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import styled from "styled-components";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
  return (
    <StyledRow gutter={16}>
      <Col span={6}>
        <StyledText>TIKI CLONE</StyledText>
      </Col>

      <Col span={12}>
        <Search
          placeholder="Input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={() => {}}
        />
      </Col>

      <Col span={6} style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <StyledAccountWrapper>
          <UserOutlined style={{ fontSize: "30px" }} />
          <div>
            <span>Đăng nhập/ Đăng ký</span>
            <div>
              <span>Tài khoản</span>
              <CaretDownOutlined />
            </div>
          </div>
        </StyledAccountWrapper>
        <div>
          <ShoppingCartOutlined style={{ fontSize: "30px" }} />
          <span>Giỏ hàng</span>
        </div>
      </Col>
    </StyledRow>
  );
};

export default Header;

const StyledRow = styled(Row)`
  padding: 10px 120px;
  background-color: rgb(26, 148, 255);
  color: #fff;
  align-items: center;
`;

const StyledText = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
`;

const StyledAccountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
