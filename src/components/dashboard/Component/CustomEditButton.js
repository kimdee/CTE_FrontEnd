import { useNavigate } from 'react-router-dom';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';

import { UserModal } from './UserModal';

export const CustomEditButton = ({
  title,
  data,
  fetch,
  rawData,
  row,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === 'Patient') {
      navigate('/patients/form', {
        state: {
          data: rawData.filter(
            value => value.PK_patients_ID === data.PK_patients_ID
          ),
        },
      });
      return;
    }

    navigate('/case/form', {
      state: { data: rawData.filter(x => x.PK_cases_ID == data.PK_cases_ID) },
    });
  };

  return (
    <>
      <IconButton
        color={'green.400'}
        onClick={title === 'Patient' || title === 'Case' ? handleClick : onOpen}
      >
        <MdOutlineEdit />
      </IconButton>
      {title !== 'User' ? (
        ''
      ) : (
        <UserModal
          title={title}
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          fetch={fetch}
        />
      )}
    </>
  );
};