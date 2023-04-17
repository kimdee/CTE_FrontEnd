import { useNavigate } from 'react-router-dom';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';

import { UserModal } from './UserModal';
import { AnnouncementEditModal } from './AnnouncementEditModal';
import { ProfileEditModal } from './ProfileEditModal';
import { RequestEditModal } from './RequestEditModal';

import useAuth from '../../Hooks/AuthContext';



export const CustomEditButton = ({
  title,
  data,
  fetch,
  rawData,
  announcementData,
  row,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const { user } = useAuth();

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
        onClick={title === 'Case' ? handleClick : onOpen}
      >
        <MdOutlineEdit />
      </IconButton>
      
      {title === 'Post Announcement' ? (
        <AnnouncementEditModal
          title={title}
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          fetch={fetch}
          rawData={rawData}
        />
      ) : title === 'Staff' ? (
        <ProfileEditModal
          title={title}
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          fetch={fetch}
          rawData={rawData}
          row={row}
        /> 
        ) : title === 'Request' && user.user_role === 'User' ? (
          <RequestEditModal
            title={title}
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            fetch={fetch}
            rawData={rawData}
            row={row}
          />
        ): (
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