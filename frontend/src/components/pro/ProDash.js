// Prodash.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProSidebar from './ProSidebar';
import ProNav from './ProNav'; // Reusing ProNav component

const Prodash = () => {
  const navigate = useNavigate();

  // Check token and validate user with the protected route
  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('authToken'); // Retrieve token from cookies

      if (!token) {
        console.error('No token found. Redirecting to login...');
        navigate('/proLogin'); // Redirect if no token is found
        return;
      }

      try {
        // Call the protected route with the token in the header
        await axios.get('https://lampros-backend.vercel.app/api/user/protected-route', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in the header
          },
        });
        console.log('User is authorized.');
      } catch (error) {
        console.error('Failed to authenticate. Redirecting to login...', error);
        Cookies.remove('authToken'); // Clear token if authentication fails
        navigate('/proLogin'); // Redirect to login
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <DashboardContainer>
      <ProSidebar />
      <MainContent>
        <ProNav />
        <DashboardSection>
          <SalesPerformance>
            <Title>Sales Performance</Title>
            <BarChart>
              <Bar data-height="50%">Jan</Bar>
              <Bar data-height="70%">Mar</Bar>
              <Bar data-height="60%">May</Bar>
              <Bar data-height="50%">Jul</Bar>
            </BarChart>
            <PerformanceSummary>
              30% Your sales performance is 30% better compared to last month.
            </PerformanceSummary>
          </SalesPerformance>

          <ProductActions>
            <ActionButton onClick={() => navigate('/add-product')}>
              Add Product
            </ActionButton>
            <ActionButton>All Products</ActionButton>
          </ProductActions>
        </DashboardSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default Prodash;

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f6f9;
  font-family: 'Poppins', sans-serif;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const DashboardSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SalesPerformance = styled.div`
  width: 60%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
`;

const BarChart = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Bar = styled.div`
  width: 20%;
  height: ${({ 'data-height': height }) => height};
  background-color: #
  007bff;
  color: #fff;
  text-align: center;
  line-height: 2;
`;

const PerformanceSummary = styled.p`
  font-size: 14px;
  color: #777;
`;

const ProductActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 15px;
  background-color: #ff7a00;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff6500;
  }
`;
