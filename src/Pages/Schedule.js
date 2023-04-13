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
  } from '@chakra-ui/react';

  
import CustomModal from '../Components/CustomModal';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import { CustomFormController } from '../Components/Custom';

import useAuth from '../Hooks/AuthContext';

import { GetRequest, PostRequest } from '../API/api'
import { Schedule } from '../API/Paths';

import { toastposition, toastvariant } from './Packages';
import StatusHandler from '../Utils/StatusHandler';

const AddModal = ({ isOpen, onClose, fetch, users }) => {
  const title = 'Schedule';

  const [description, setDescription] = useState('');
  const [fileUpload, setFileUpload] = useState('');

  const toast = useToast();
  const [loader, setLoader] = useState(false);

  const {
    user,
  } = useAuth();
  
  const handleSubmit = async e => {
    e.preventDefault();
    let msg = '';

    let formData = new FormData();
    formData.append('Description', description);
    formData.append('FileUpload', fileUpload);

    PostRequest(
      { url: Schedule },
      {
        Description: description,
        FileUpload: fileUpload,
      }
    )
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        onClose();
        setDescription('');
        setFileUpload('');
        fetch(true);

        toast({
          title: 'New Schedule added!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
        msg = 'success';
      })
      .catch(err => {
        toast({
          title: 'Failed to add data!',
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
        msg = StatusHandler(err);
      });
  };

  const handleOpenFile = () => {
    document.getElementById('file').click();
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
      <Grid
        templateRows={`repeat( 2 , 1fr)`}
        templateColumns={`repeat( 2 , 1fr)`}
        gap={2}
        overflow={'hidden'}
      >
        <GridItem rowSpan={2} colSpan={4}>
          <FormControl isRequired mt={5}>
            <FormLabel htmlFor="postDetails" fontSize="sm">
              Description
            </FormLabel>

            <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="postPicture" fontSize="sm">
              Upload Image
            </FormLabel>
            
            <Input
              type="file"
              // value={fileUpload}
              onChange={(e) => setFileUpload(e.target.value)}
            />
          </FormControl>
        </GridItem>
      </Grid>
    </CustomModal>
    </>
  )

};

const Schedules = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [schedules, setSchedules] = useState([]);
    const [fetch, setFetch] = useState(false);
    const { search, setSearch } = useAuth();
    const Title = 'Schedule';

    
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'Description',
    },
    {
      Header: 'FILEUPLOAD',
      accessor: 'FileUpload',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  const handleFetchSchedule = async () => {
    GetRequest({ url: Schedule })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const { data } = res;

        if (data.length === schedules.length) {
          return;
        }
        setSchedules(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

   //SearchFilter
   const filtered = schedules.filter(filter =>
    filter.Description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (fetch) {
        setFetch(false);
      }
      handleFetchSchedule();
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

export default Schedules;
