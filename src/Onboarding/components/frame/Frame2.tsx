import imgFrame2Tree from '../../assets/imgFrame2Tree.png';
import { imgPopUp } from '../../styles/animation';
import FrameSection from './FrameSection';
import TextField from './TextField';

const Frame2 = () => {
  return (
    <FrameSection>
      <TextField
        subTitle="OKR tree"
        subTitleColor="main_purple"
        title="흩어져 있는 할 일을 하나의 북극성 아래"
        description="파편화된 할일들을 단 3개의 우선순위로 정렬시켜 핵심 지표를 달성하는데 집중하세요"
      />
      <img css={imgPopUp} src={imgFrame2Tree} alt="tree-img" width={986} height={576} />
    </FrameSection>
  );
};

export default Frame2;
