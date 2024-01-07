import NodeLines from '@components/OkrTree/Lines/NodeLines';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

import KrTaskContainer from './KrTaskContainer';

const KrContainer = ({ keyResultsProps }: { keyResultsProps: IKeyResultTypes[] }) => {
  return (
    <StKrContainer>
      {keyResultsProps.map((kr) => {
        return (
          <StKrWrapper key={kr.title}>
            <NodeLines />
            <KrTaskContainer krProp={kr} />
          </StKrWrapper>
        );
      })}
    </StKrContainer>
  );
};

export default KrContainer;

const StKrContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div:first-child {
    > div:first-child {
      div:first-child {
        background-color: transparent;
      }
    }
  }

  /* stylelint-disable */
  & > div:last-child {
    > div:first-child {
      div:last-child {
        background-color: transparent;
      }
    }
  }
`;

const StKrWrapper = styled.div`
  display: flex;
`;
