import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

import { ObjectiveNodes } from '../Nodes/CommonOkrNodes';
import KrContainer from './Kr/KrContainer';

interface IOkrTreeProps {
  objTitle: string;
  keyResultList: IKeyResultTypes[];
}

const OkrTree = ({ objTitle, keyResultList }: IOkrTreeProps) => {
  return (
    <StOkrTreeContainer>
      <ObjectiveNodes title={objTitle} />
      <StKrTreeWrapper>
        <KrContainer keyResultsProps={keyResultList} />
      </StKrTreeWrapper>
    </StOkrTreeContainer>
  );
};

export default OkrTree;

const StOkrTreeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StKrTreeWrapper = styled.div`
  display: flex;
`;
