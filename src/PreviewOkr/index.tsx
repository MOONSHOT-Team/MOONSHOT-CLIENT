import OkrTree from '@components/OkrTree/Template/OkrTree';
import { MOCK_OKR_DATA } from '@constants/MOCK_OKR_DATA';

const PreviewOkr = () => {
  const { objTitle, krList } = MOCK_OKR_DATA;
  return (
    <div>
      <OkrTree objTitle={objTitle} keyResultList={krList} />
    </div>
  );
};

export default PreviewOkr;
