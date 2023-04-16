import React, { useState } from 'react';
import { useToast, Select, FormControl, FormLabel } from '@chakra-ui/react';

import {
  toastposition,
  toastvariant,
} from '../../Pages/Packages';

import CustomModal from '../CustomModal'
import TextFormController from '../TextFormControl'

import { StatusHandler } from '../../Utils/StatusHandler';

import { PutRequest } from '../../API/api';
import { Request } from '../../API/Paths';

export const RequestEditModal = ({ title, isOpen, onClose, data, fetch }) => {
  const toast = useToast();
  const [verify, setVerify] = useState(data === null ? '' : data.status);


  const onSave = async e => {
    e.preventDefault();
    let msg = '';
    
    let formData = new FormData();
    formData.append('id', data.id);
    formData.append('status', verify);

    PutRequest({ url: Request }, formData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response', { cause: res });
        }
        fetch(true);
        onClose();

        toast({
          title: 'Updated Successfully!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
      })
      .catch(err => {
        msg = StatusHandler(err);
        toast({
          title: 'Something went wrong!',
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
      });
  };

  return (
    <>
      <CustomModal
       title={title}
       isOpen={isOpen}
       onClose={onClose}
       handleSubmit={onSave}
       hasProfile={false}
       isNew={false}
       btntitle={'Update'}
      >
        <FormControl isRequired>
          <FormLabel>Account Status</FormLabel>
          <Select
            fontSize={14}
            marginLeft={''}
            focusBorderColor={'gray.400'}
            placeholder="- Please Select -"
            bg={'gray.100'}
            required
            size="md"
            value={verify}
            setValue={setVerify}
            onChange={(e) => setVerify(e.target.value)}
          >

           <option value={'Pending'}>Pending</option>
           <option value={'Approve'}>Approve</option>
           <option value={'Decline'}>Decline</option>
          </Select>
        </FormControl>
      </CustomModal>
    </>
  );
};