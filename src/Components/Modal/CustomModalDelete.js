import React, { useState } from 'react';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';

import useAuth from '../../Hooks/AuthContext';
import { toastvariant, toastposition } from '../../Pages/Packages';
import { StatusHandler } from '../../Utils/StatusHandler';
import { DeleteRequest } from '../../API/api';

import {
  User,
  Profile,
  Announcement,
} from '../../API/Paths';

export const CustomModalDelete = ({ title, isOpen, onClose, id, fetch }) => {
  const [dissable, setDissable] = useState(true);

  let result = [];
  let statusResult = '';

  const { user } = useAuth();
  const toast = useToast();

  const onChange = value => {
    if (user.name !== value) {
      setDissable(true);
      return;
    }
    setDissable(false);
  };

  const handleDelete = async () => {
    switch (title) {
      case 'Post Announcement':
        DeleteRequest({ url: Announcement }, {
          id: id[0].announcement_id,
        })
          .then(res => {
            if (!res.statusText === 'OK') {
              throw new Error('Bad response.', { cause: res });
            }
          })
          .catch(err => {
            const responseMessage = StatusHandler(err);
            toast({
              title: responseMessage,
              position: toastposition,
              variant: toastvariant,
              status: 'error',
              isClosable: true,
            });
          });
      break;

      case 'User':
        DeleteRequest({ url: Profile }, { id: id[0].user_id })
          .then(res => {
            if (!res.statusText === 'OK') {
              throw new Error('Bad response.', { cause: res });
            }
          })
          .catch(err => {
            const responseMessage = StatusHandler(err);
            toast({
              title: responseMessage,
              position: toastposition,
              variant: toastvariant,
              status: 'error',
              isClosable: true,
            });
          });
        break;

       
    }

    onClose();
    fetch(true);
    setDissable(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
      <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl>
            <FormLabel display="flex" columnGap={2}>
              To delete type <Text fontWeight={'700'}>{user.name}</Text>
            </FormLabel>

            <Input
              type="text"
              onChange={e => onChange(e.target.value)}
              onPaste={e => onChange(e.target.value)}
              autoFocus
            />
            <FormHelperText display="flex" columnGap={2}>
              <Text color={'orange'}>Warning</Text> data will be delete
              permanently!
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button bg={'lightwhite'} color="black" mr={3} onClick={onClose}>
            Cancel
          </Button>
          
          <Button
           bg={'red.500'}
           color={'white'}
           _hover={{ bg: 'red.600' }}
           disabled={dissable}
           onClick={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};