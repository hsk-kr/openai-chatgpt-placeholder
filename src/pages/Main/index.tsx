import styled from '@emotion/styled';
import Header from '../../components/Header';
import PlaceholderList from '../../components/PlaceholderList';
import PlaceholderEditModal from '../../components/PlaceholderEditModal';
import usePlaceholderList from '../../hooks/usePlaceholderList';
import useToolAvailable from '../../hooks/useToolAvailable';
import { useState } from 'react';

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
  const [selectedPlaceholderListItemId, setSelectedPlaceholderListItemId] =
    useState<string>();

  const handleAvailableChange = (active: boolean) => {
    setAvailable(active);
  };

  const openPlaceHolderEditModal = (id: string) => {
    setSelectedPlaceholderListItemId(id);
  };

  const closePlaceHolderEditModal = () => {
    setSelectedPlaceholderListItemId(undefined);
  };

  return (
    <Container>
      <PlaceholderEditModal
        visible={selectedPlaceholderListItemId !== undefined}
        placeholderId={selectedPlaceholderListItemId}
        onClose={closePlaceHolderEditModal}
        onSubmit={closePlaceHolderEditModal}
      />
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
          onItemClick={openPlaceHolderEditModal}
        />
      </ListContainer>
    </Container>
  );
};

export default Main;
