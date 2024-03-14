import styled from '@emotion/styled';
import { ConfigProvider, DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';

import { IObjInfoTypes } from '../../types/ObjectInfoTypes';

const { RangePicker } = DatePicker;

interface IKeyResultPeriodInputProps {
  handleClickSelectDate: (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => void;
  krPeriod: string[];
  objInfo:
    | IObjInfoTypes
    | { objId: number; objStartAt: string; objExpireAt: string; objTitle: string };
}

const KeyResultPeriodInput = ({
  handleClickSelectDate,
  krPeriod,
  objInfo,
}: IKeyResultPeriodInputProps) => {
  const { objStartAt, objExpireAt } = objInfo;

  const formatDate = (dateString: string) => {
    const formattedDate = dateString.replace(/\./g, '-');
    return formattedDate;
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return (
      current < dayjs(objStartAt.split('. ').join('')) ||
      current > dayjs(objExpireAt.split('. ').join('')).startOf('day')
    );
  };

  return (
    <StKRPeriodContainer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8D7EFD',
            controlItemBgHover: '#8D7EFD',
            borderRadius: 10,
            colorBgContainer: '#1E1E20',
            colorBgElevated: '#2F2F2F',
            colorText: '#A7A7A7',
            colorTextHeading: '#A7A7A7',
            colorIcon: '#A7A7A7',
            colorTextQuaternary: 'rgba(255,255,255,50%)',
            controlItemBgActive: '#8D7EFD2D',
          },
        }}
      >
        <RangePicker
          variant="borderless"
          onChange={handleClickSelectDate}
          value={[dayjs(formatDate(krPeriod[0])), dayjs(formatDate(krPeriod[1]))]}
          defaultValue={[dayjs(), dayjs()]}
          format={'YYYY. MM. DD'}
          disabledDate={disabledDate}
        />
      </ConfigProvider>
    </StKRPeriodContainer>
  );
};

export default KeyResultPeriodInput;

const StKRPeriodContainer = styled.div`
  * {
    color: ${({ theme }) => theme.colors.gray_000};
  }

  .ant-picker-input > input::placeholder {
    color: ${({ theme }) => theme.colors.gray_000};
    ${({ theme }) => theme.fonts.body_12_regular};
  }

  .ant-picker-input > input {
    width: 8rem;
    color: ${({ theme }) => theme.colors.gray_000};
    border: none;
    ${({ theme }) => theme.fonts.body_12_regular};
  }

  .ant-picker-range-separator {
    padding: 0;
  }
`;
