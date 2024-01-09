import OkrTreeTemplate from '@components/OkrTree/template/OkrTreeTemplate';
import { MOCK_OKR_DATA } from '@constants/MOCK_OKR_DATA';
import { css } from '@emotion/react';

import { PreviewKrNodes } from './components/previewOkrTreeNodes/PreviewKrNodes';
import { PreviewTaskNodes } from './components/previewOkrTreeNodes/PreviewTaskNodes';

const PreviewOkr = () => {
  const { objTitle, krList } = MOCK_OKR_DATA;
  return (
    // O 노드<의 위치 고정을 위해 트리 가져올때 항상 상위 요소에 높이 값(100vh or 100%), 세로 가운데 정렬해야함 !
    <section css={previewOkrContainer}>
      <OkrTreeTemplate
        objTitle={objTitle}
        keyResultList={krList}
        KrNodes={PreviewKrNodes}
        TaskNodes={PreviewTaskNodes}
      />
    </section>
  );
};

export default PreviewOkr;

const previewOkrContainer = css`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 26.9rem;
`;
