import React, { useState } from 'react';
import { useToast, Select, FormControl, FormLabel } from '@chakra-ui/react';

import {
  toastposition,
  toastvariant,
} from '../Packages';

import CustomModal from '../Component/CustomModal'
import TextFormController from '../Component/TextFormControl'

import { StatusHandler } from '../../Utils/StatusHandler';

import { PutRequest } from '../../api/api';
import { User } from '../../api/Path';

export const UserModal = ({ title, isOpen, onClose, data, fetch }) => {
  const toast = useToast();

  const [name, setName] = useState(data === null ? '' : data.fullname);
  const [email, setEmail] = useState(data === null ? '' : data.email);
  const [verify, setVerify] = useState(data === null ? '' : data.status);

  const onSave = async e => {
    e.preventDefault();

    if (verify === data.status && verify === 0) {
      toast({
        title: 'Update account status',
        position: toastposition,
        variant: toastvariant,
        status: 'warning',
        isClosable: true,
      });
    }

    if (verify === data.status && verify === null) {
      toast({
        title: 'Account Status needed',
        position: toastposition,
        variant: toastvariant,
        status: 'warning',
        isClosable: true,
      });
    }

    let msg = '';
    let formData = new FormData();
    formData.append('id', data.id);
    formData.append('isDeleted', verify);

    PutRequest({ url: `${User}/approved` }, formData)
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
        <TextFormController
          title={'Fullname'}
          value={name}
          setValue={setName}
          isDisabled={true}
        />

        <TextFormController
          title={'Email'}
          value={email}
          setValue={setEmail}
          isDisabled={true}
        />
        <FormControl isRequired>
          <FormLabel>Account Status</FormLabel>
          <Select
            fontSize={14}
            marginLeft={''}
            focusBorderColor={'gray.400'}
            placeholder="- Please Select -"
            bg={'gray.100'}
            required
            onChange={e => setVerify(e.target.value)}
            value={verify}
          >
            <option>Activated</option>
            <option>Deactivated</option>
          </Select>
        </FormControl>
      </CustomModal>
    </>
  );
};