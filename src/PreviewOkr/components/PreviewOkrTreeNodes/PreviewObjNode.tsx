import { CommonObjNode } from '@components/OkrTree/Nodes/CommonObjNode';
import styled from '@emotion/styled';

export interface IPreviewObjNodeProps {
  objValue: string;
  handleChangeObjValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PreviewObjNode = ({ objValue, handleChangeObjValue }: IPreviewObjNodeProps) => {
  return (
    <CommonObjNode>
      <StPreviewObjTextArea
        value={objValue}
        onChange={handleChangeObjValue}
        maxLength={30}
        rows={2}
      />
    </CommonObjNode>
  );
};

export default PreviewObjNode;

const StPreviewObjTextArea = styled.textarea`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  word-break: keep-all;
  resize: none;
  background: transparent;
  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.body_13_medium};
`;
