import OkrTreeTemplate from '@components/OkrTree/template/OkrTreeTemplate';
import { MOCK_OKR_DATA } from '@constants/MOCK_OKR_DATA';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import PreviewOkrAlertMsg from '../PrviewOkr/components/PreviewOkrAlertMsg';
import { PreviewKrNodes } from './components/previewOkrTreeNodes/PreviewKrNodes';
import { PreviewTaskNodes } from './components/previewOkrTreeNodes/PreviewTaskNodes';

const PreviewOkr = () => {
  const handleClickSaveOkrBtn = () => {
    console.log('여기서 okr 생성 post api 한 번에 통신 예쩡');
  };
  const { objTitle, krList } = MOCK_OKR_DATA;
  return (
    // O 노드<의 위치 고정을 위해 트리 가져올때 항상 상위 요소에 높이 값(100vh or 100%), 세로 가운데 정렬해야함 !
    <section css={previewOkrContainer}>
      <PreviewOkrAlertMsg />
      <div css={okrTreeDiv}>
        <OkrTreeTemplate
          objTitle={objTitle}
          keyResultList={krList}
          KrNodes={PreviewKrNodes}
          TaskNodes={PreviewTaskNodes}
        />
      </div>

      <StSaveOkrBtn type="button" onClick={handleClickSaveOkrBtn}>
        저장하기
      </StSaveOkrBtn>
    </section>
  );
};

export default PreviewOkr;

const previewOkrContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const okrTreeDiv = css`
  display: flex;
  align-self: flex-start;
  padding-left: 26.9rem;
`;

const StSaveOkrBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17.8rem;
  height: 3.4rem;
  margin-bottom: 4.6rem;
  color: ${({ theme }) => theme.colors.gray_650};
  background: ${({ theme }) => theme.colors.gray_100};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold};
`;
