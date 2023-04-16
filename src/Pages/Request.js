import React, { useState, useEffect } from 'react';


import {
    Box,
    Grid,
    GridItem,
    Container,
    useDisclosure,
    useToast,
    Center,
    FormControl,
    FormLabel,
    Input,
    Textarea,
  } from '@chakra-ui/react';

  
import CustomModal from '../Components/CustomModal';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import { CustomFormController } from '../Components/Custom';

import useAuth from '../Hooks/AuthContext';

import { GetRequest, PostRequest } from '../API/api'
import { Request } from '../API/Paths';

import { toastposition, toastvariant } from './Packages';
import StatusHandler from '../Utils/StatusHandler';

const AddModal = ({ isOpen, onClose, fetch, users }) => {
  const title = 'Request';

  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const toast = useToast();
  const [loader, setLoader] = useState(false);

  const {
    user,
  } = useAuth();
  
  const handleSubmit = async e => {
    e.preventDefault();
    let msg = '';

    let formData = new FormData();
    formData.append('Type', type);
    formData.append('Description', description);

    PostRequest(
      { url: Request },
      {
        Type: type,
        Description: description,
      }
    )
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        onClose();
        setType('');
        setDescription('');
        fetch(true);

        toast({
          title: 'Request send!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
        msg = 'success';
      })
      .catch(err => {
        toast({
          title: 'Failed to send Request data!',
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
        msg = StatusHandler(err);
      });
  };

  return(
    <>
    <CustomModal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      hasProfile={false}
      isNew={true}
      btntitle={'Save'}
      loader={loader}
    >
         <CustomFormController
         isSignup={true}
         title={'Type of Request'}
         type={'text'}
         value={type}
         placeholder={`Type of request`}
         setValue={setType}
         errorMessage={`Type of request is required.`}
         children={
           <Box
             w={8}
             h={4}
             mt={6}
             mb={6}
             borderRight={'1px solid #e0e0e0'}
           >
           </Box>
         } />

        <FormControl isRequired mt={5}>
            <FormLabel htmlFor="postDetails" fontSize="sm">
            Description
            </FormLabel>
            <Textarea
              size="sm"
              placeholder={`Please type your reason`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              // onChange={e => { setDetails(e.target.value);}}
            />
        </FormControl>
    </CustomModal>
    </>
  )

};

const Requests = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [requests, setRequests] = useState([]);
    const [fetch, setFetch] = useState(false);
    const { search, setSearch } = useAuth();
    const Title = 'Request';

    
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'TYPE',
      accessor: 'Type',
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'Description',
    },
    {
      Header: 'STATUS',
      accessor: 'Status',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  const handleFetchRequest = async () => {
    GetRequest({ url: Request })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const { data } = res;

        if (data.length === requests.length) {
          return;
        }
        setRequests(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

   //SearchFilter
   const filtered = requests.filter(filter =>
    filter.Type.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (fetch) {
        setFetch(false);
      }
      handleFetchRequest();
    }, [fetch ? 0 : 40000]);

    return () => clearInterval(intervalId);
  }, [fetch]);

  return (
      <>
        <Container maxW={'container.xxl'}>
          <Box mt={5} p={[0, 0, 2, 3]}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              data={filtered}
              search={search}
              setSearch={setSearch}
              onOpen={onOpen}
              isModal={true}
            />
          </Box>
        </Container>
  
        <AddModal isOpen={isOpen} onClose={onClose} fetch={setFetch} />
      </>
    );

}

export default Requests;
