import { css } from '@emotion/react';
import styled from '@emotion/styled';

const KrCheckIn = () => {
  // const [isActive, setIsActive] = useState(true);
  const handleRadioChange = () => {};
  return (
    <div>
      <form css={checkRadioBoxStyles}>
        <label htmlFor="krCheckInput" css={checkRadioStyles}>
          <StRadioInput
            id="krCheckInput"
            type="radio"
            name="krCheck"
            value="true"
            onChange={handleRadioChange}
          ></StRadioInput>
          <span>진척 정도 입력하기</span>
        </label>
        <label htmlFor="krCheckEdit" css={checkRadioStyles}>
          <StRadioInput
            id="krCheckEdit"
            type="radio"
            name="krCheck"
            value="false"
            onChange={handleRadioChange}
          ></StRadioInput>
          <span>kr 수정하기</span>
        </label>
      </form>
      <div>아래부분</div>
    </div>
  );
};

export default KrCheckIn;

const StRadioInput = styled.input`
  display: none;

  + span {
    ${({ theme }) => theme.fonts.body_12_medium};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 4.7rem;
  }

  &:checked + span {
    border-style: inset;
    border-bottom: 2px solid ${({ theme }) => theme.colors.sub_mint};
  }
`;

const checkRadioBoxStyles = css`
  display: flex;
  width: 100%;
`;

const checkRadioStyles = css`
  display: flex;
`;
