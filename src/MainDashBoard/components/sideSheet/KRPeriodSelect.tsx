import styled from '@emotion/styled';
import { ConfigProvider, DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

import { patchCheckIn } from '../../apis/fetcher';

const { RangePicker } = DatePicker;

const KRPeriodSelect = ({
  keyResultId,
  objStartAt,
  objExpireAt,
  startAt,
  expireAt,
}: {
  keyResultId: number;
  objStartAt: string;
  objExpireAt: string;
  startAt: string;
  expireAt: string;
}) => {
  const [period, setPeriod] = useState([startAt, expireAt]);
  const navigate = useNavigate();

  const handleKrPeriodChange = async (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => {
    if (!formatString[0] || !formatString[1]) return;
    formatString[0] && formatString[1] ? setPeriod(formatString) : {};

    const data = {
      keyResultId: keyResultId,
      krStartAt: formatDate(formatString[0]),
      krExpireAt: formatDate(formatString[1]),
    };
    try {
      await patchCheckIn('/v1/key-result', data);
      await mutate(`/v1/key-result/${keyResultId}`);
    } catch {
      navigate('/error');
    }
  };

  const formatDate = (dateString: string) => {
    const formattedDate = dateString.replace(/\./g, '-').replace(/\s/g, '');
    return formattedDate;
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current < dayjs(objStartAt).endOf('day') || current > dayjs(objExpireAt).startOf('day');
  };

  return (
    <StKRPeriodContainer className="alter_duration">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8D7EFD',
            controlItemBgHover: '#8D7EFD',
            borderRadius: 10,
            colorBgContainer: '#1E1E20',
            colorBgElevated: '#2F2F2F',
            colorText: '#a7a7a7',
            colorTextHeading: '#a7a7a7',
            colorIcon: '#a7a7a7',
            colorTextQuaternary: 'rgba(255,255,255,50%)',
            controlItemBgActive: '#8D7EFD2D',
          },
        }}
      >
        <RangePicker
          variant="borderless"
          onChange={handleKrPeriodChange}
          value={[dayjs(formatDate(period[0])), dayjs(formatDate(period[1]))]}
          defaultValue={[dayjs(formatDate(period[0])), dayjs(formatDate(period[1]))]}
          format={'YYYY. MM. DD'}
          disabledDate={disabledDate}
        />
      </ConfigProvider>
    </StKRPeriodContainer>
  );
};

export default KRPeriodSelect;

const StKRPeriodContainer = styled.div`
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
