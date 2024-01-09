import styled from '@emotion/styled';
import { ConfigProvider, DatePicker } from 'antd';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const OKRPeriod = () => {
  const handleCalendarChange = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ): void => {
    console.log([formatString[0], formatString[1]]);
  };
  return (
    <Test>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8D7EFD',
            borderRadius: 2,
            colorBgContainer: '#1E1E20',
          },
        }}
      >
        <RangePicker bordered={false} onCalendarChange={handleCalendarChange} />
      </ConfigProvider>
    </Test>
  );
};

export default OKRPeriod;

const Test = styled.div`
  * {
    color: ${({ theme }) => theme.colors.gray_000};
    background-color: ${({ theme }) => theme.colors.gray_600};
  }

  .ant-picker-input > input::placeholder {
    color: ${({ theme }) => theme.colors.gray_000};
    ${({ theme }) => theme.fonts.body_12_regular};
  }

  .ant-picker-input > input {
    color: ${({ theme }) => theme.colors.gray_000};
    border: none;
    ${({ theme }) => theme.fonts.body_12_regular};
  }
`;
