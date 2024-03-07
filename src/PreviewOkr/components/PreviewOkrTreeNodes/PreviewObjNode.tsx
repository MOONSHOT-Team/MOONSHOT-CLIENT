import { CommonObjNode } from '@components/okrTree/nodes/CommonObjNode';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';
export interface IPreviewObjNodeProps {
  objValue: string;
  handleChangeObjValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PreviewObjNode = ({ objValue, handleChangeObjValue }: IPreviewObjNodeProps) => {
  return (
    <CommonObjNode hoverStyle={true}>
      <StPreviewObjTextArea
        value={objValue}
        onChange={handleChangeObjValue}
        maxLength={30}
        minRows={1}
        maxRows={3}
        cacheMeasurements
      />
    </CommonObjNode>
  );
};

export default PreviewObjNode;

const StPreviewObjTextArea = styled(TextareaAutosize)`
  width: 15.9rem;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
  resize: none;
  background: transparent;
  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.body_13_medium};

  &:focus {
    border: none;
    outline: none;
  }
`;
