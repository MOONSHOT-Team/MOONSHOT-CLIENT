export interface IObjInfoTypes {
  objTitle: string;
  objCategory: string;
  objContent: string;
  objStartAt: string;
  objExpireAt: string;
}

export interface IAddObjFlowProps {
  objInfo: IObjInfoTypes;
  setObjInfo: React.Dispatch<React.SetStateAction<IObjInfoTypes>>;
  onValidNextStep: (isValid: boolean) => void;
}
