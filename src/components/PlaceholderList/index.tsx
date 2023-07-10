import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';

interface PlaceholderListItem {
  id: string;
  title: string;
  active: boolean;
}

interface PlaceholderListProps {
  items?: PlaceholderListItem[];
  onItemClick?: (id: string) => void;
  onItemDelete?: (id: string) => void;
  onItemToggle?: (id: string, active: boolean) => void;
}

const PlaceholderList = ({
  items = [],
  onItemClick,
  onItemDelete,
  onItemToggle,
}: PlaceholderListProps) => {
  const handleItemClick = (id: string) => () => {
    onItemClick?.(id);
  };

  const handleItemDelete = (id: string) => () => {
    onItemDelete?.(id);
  };

  const handleItemToggle =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onItemToggle?.(id, e.target.checked);
    };

  return (
    <List
      dense={true}
      sx={{
        overflow: 'auto',
      }}
    >
      {items.map((item) => (
        <ListItem
          key={item.id}
          style={{
            paddingRight: 96,
          }}
          secondaryAction={
            <>
              <Switch
                edge="end"
                checked={item.active}
                onChange={handleItemToggle(item.id)}
              />
              <IconButton edge="end" onClick={handleItemDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemButton onClick={handleItemClick(item.id)}>
            <ListItemText primary="Single-line" />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default PlaceholderList;
