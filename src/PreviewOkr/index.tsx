import OkrTree from '@components/OkrTree/Template/OkrTree';
import { MOCK_OKR_DATA } from '@constants/MOCK_OKR_DATA';

import { PreviewKrNodes } from './components/PreviewOkrTreeNodes/PreviewKrNodes';
import { PreviewTaskNodes } from './components/PreviewOkrTreeNodes/PreviewTaskNodes';

const PreviewOkr = () => {
  const { objTitle, krList } = MOCK_OKR_DATA;
  return (
    <div>
      <OkrTree
        objTitle={objTitle}
        keyResultList={krList}
        KrNodes={PreviewKrNodes}
        TaskNodes={PreviewTaskNodes}
      />
    </div>
  );
};

export default PreviewOkr;
