import OkrTreeTemplate from '@components/OkrTree/Template/OkrTreeTemplate';
import { MOCK_OKR_DATA } from '@constants/MOCK_OKR_DATA';

import { PreviewKrNodes } from './components/PreviewOkrTreeNodes/PreviewKrNodes';
import { PreviewTaskNodes } from './components/PreviewOkrTreeNodes/PreviewTaskNodes';

const PreviewOkr = () => {
  const { objTitle, krList } = MOCK_OKR_DATA;
  return (
    <div>
      <OkrTreeTemplate
        objTitle={objTitle}
        keyResultList={krList}
        KrNodes={PreviewKrNodes}
        TaskNodes={PreviewTaskNodes}
      />
    </div>
  );
};

export default PreviewOkr;
