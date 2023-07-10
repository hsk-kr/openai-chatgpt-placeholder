import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface PlaceholderEditModalProps {
  placeholderId?: number;
  visible?: boolean;
  onClose?: VoidFunction;
  onSubmit?: VoidFunction;
}

const Container = styled.div`
  position: absolute;
  z-index: 1;
  background-color: #fff;
  left: 8px;
  right: 8px;
  top: 8px;
  bottom: 8px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  justify-content: center;
`;

const SubmitWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  justify-content: flex-end;
`;

const PlaceholderEditModal = ({ visible }: PlaceholderEditModalProps) => {
  if (!visible) return <></>;

  return (
    <Container>
      <TextField required label="%Title%" size="small" />
      <TextField required multiline label="Placeholder" rows={4} />
      <SubmitWrapper>
        <Button variant="contained">Apply</Button>
        <Button variant="outlined">Cancel</Button>
      </SubmitWrapper>
    </Container>
  );
};

export default PlaceholderEditModal;
