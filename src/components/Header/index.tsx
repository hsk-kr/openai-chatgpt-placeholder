import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { ChangeEvent } from 'react';

interface HeaderProps {
  onAdd?: VoidFunction;
  checked?: boolean;
  onChange?: (active: boolean) => void;
}

const Tools = styled.div`
  display: flex;
  align-items: center;
`;

const Header = ({ checked, onAdd, onChange }: HeaderProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          OpenAI ChatGPT Placeholder
        </Typography>
        <Tools>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label={checked ? 'ON' : 'OFF'}
            />
          </FormGroup>
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tools>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
