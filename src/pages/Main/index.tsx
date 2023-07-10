import styled from '@emotion/styled';
import Header from '../../components/Header';
import PlaceholderList from '../../components/PlaceholderList';
import PlaceholderEditModal from '../../components/PlaceholderEditModal';
import usePlaceholderList from '../../hooks/usePlaceholderList';
import useToolAvailable from '../../hooks/useToolAvailable';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const ListContainer = styled.div`
  height: calc(100% - 64px);
  overflow-y: auto;
`;

const Main = () => {
  const {
    placeholderList,
    addNewPlaceholderListItem,
    removePlaceholderListItem,
    togglePlaceholderListItemActive,
  } = usePlaceholderList();
  const { available, setAvailable } = useToolAvailable();

  const handleAvailableChange = (active: boolean) => {
    setAvailable(active);
  };

  return (
    <Container>
      {/* <PlaceholderEditModal visible={true} /> */}
      <Header
        onAdd={addNewPlaceholderListItem}
        checked={available}
        onChange={handleAvailableChange}
      />
      <ListContainer>
        <PlaceholderList
          items={placeholderList}
          onItemDelete={removePlaceholderListItem}
          onItemToggle={togglePlaceholderListItemActive}
        />
      </ListContainer>
    </Container>
  );
};

export default Main;
