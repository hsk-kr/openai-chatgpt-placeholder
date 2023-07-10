import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import usePlaceholderList from '../../hooks/usePlaceholderList';
import { useEffect, useRef } from 'react';

interface PlaceholderEditModalProps {
  placeholderId?: string;
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

const PlaceholderEditModal = ({
  visible,
  placeholderId,
  onClose,
  onSubmit,
}: PlaceholderEditModalProps) => {
  const { placeholderList, setPlaceholderList } = usePlaceholderList();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const placeholderInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!visible || !titleInputRef.current || !placeholderInputRef.current)
      return;

    const target = placeholderList.find((item) => item.id === placeholderId);
    if (!target) return;

    titleInputRef.current.value = target.title;
    placeholderInputRef.current.value = target.placeholder;
  }, [placeholderId, placeholderList, visible]);

  const handleSubmit = () => {
    if (!placeholderId) {
      alert('Retry later');
      return;
    }

    setPlaceholderList((prevPlaceholderList) =>
      prevPlaceholderList.map((item) => {
        if (item.id === placeholderId) {
          item.title = titleInputRef.current?.value ?? '';
          item.placeholder = placeholderInputRef.current?.value ?? '';
        }

        return item;
      })
    );
    onSubmit?.();
  };

  if (!visible) return <></>;

  return (
    <Container>
      <TextField
        required
        label="%Title%"
        size="small"
        inputRef={titleInputRef}
        inputProps={{
          maxLength: 100,
        }}
      />
      <TextField
        required
        multiline
        label="Placeholder"
        rows={4}
        inputRef={placeholderInputRef}
        inputProps={{
          maxLength: 5000,
        }}
      />
      <SubmitWrapper>
        <Button variant="contained" onClick={handleSubmit}>
          Apply
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </SubmitWrapper>
    </Container>
  );
};

export default PlaceholderEditModal;
