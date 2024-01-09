import styled from '@emotion/styled';
import { ConfigProvider, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const { RangePicker } = DatePicker;

const KRPeriodSelect = () => {
  const [period, setPeriod] = useState(['2024-01-08', '2024-01-09']);

  const handleKrPeriodChange = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ): void => {
    formatString[0] && formatString[1] ? setPeriod(formatString) : {};
  };

  const formatDate = (dateString: string) => {
    const formattedDate = dateString.replace(/\./g, '-');
    return formattedDate;
  };
  return (
    <KRPeriodContainer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8D7EFD',
            controlItemBgHover: '#8D7EFD',
            borderRadius: 10,
            colorBgContainer: '#1E1E20',
            colorBgElevated: '#2F2F2F',
            colorText: '#fff',
            colorTextHeading: '#fff',
            colorIcon: '#fff',
            colorTextQuaternary: 'rgba(255,255,255,50%)',
            controlItemBgActive: '#8D7EFD2D',
          },
        }}
      >
        <RangePicker
          bordered={false}
          onChange={handleKrPeriodChange}
          value={[dayjs(formatDate(period[0])), dayjs(formatDate(period[1]))]}
          defaultValue={[dayjs(), dayjs()]}
          format={'YYYY. MM. DD'}
        />
      </ConfigProvider>
    </KRPeriodContainer>
  );
};

export default KRPeriodSelect;

const KRPeriodContainer = styled.div`
  * {
    color: ${({ theme }) => theme.colors.gray_000};
    background-color: ${({ theme }) => theme.colors.gray_600};
  }

  .ant-picker-input > input::placeholder {
    color: ${({ theme }) => theme.colors.gray_000};
    ${({ theme }) => theme.fonts.body_12_regular};
  }

  .ant-picker-input > input {
    width: 7rem;
    color: ${({ theme }) => theme.colors.gray_000};
    border: none;
    ${({ theme }) => theme.fonts.body_12_regular};
  }
`;
