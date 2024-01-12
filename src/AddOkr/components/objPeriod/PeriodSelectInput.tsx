import styled from '@emotion/styled';
import { ConfigProvider, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

interface IPeriodSelectInputProps {
  handleClickSelectDate: (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => void;
  period: string[];
}

const PeriodSelectInput = ({ handleClickSelectDate, period }: IPeriodSelectInputProps) => {
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
          onChange={handleClickSelectDate}
          value={[dayjs(formatDate(period[0])), dayjs(formatDate(period[1]))]}
          defaultValue={[dayjs(), dayjs()]}
          format={'YYYY. MM. DD'}
        />
      </ConfigProvider>
    </KRPeriodContainer>
  );
};

export default PeriodSelectInput;

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
    background-color: ${({ theme }) => theme.colors.transparent_purple};
    border: none;
    ${({ theme }) => theme.fonts.body_12_regular};
  }

  .ant-picker-range-separator {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.transparent_purple};
  }

  .ant-picker-separator,
  .anticon-swap-right > svg {
    background-color: ${({ theme }) => theme.colors.transparent_purple};
  }
`;
