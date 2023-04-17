import React, { useState, useEffect } from 'react';

import {
    Box,
    Grid,
    GridItem,
    Container,
    useDisclosure,
    useToast,
    FormControl,
    FormLabel,
    Select,
    Textarea,
    Input,
    Flex,
    Button,
  } from '@chakra-ui/react';

import CustomModal from '../Components/CustomModal';
import CustomTablePaginate from '../Components/CustomTablePaginate';

import { MdOutlineFileUpload } from 'react-icons/md';
import useAuth from '../Hooks/AuthContext';

import { GetRequest, PostRequest } from '../API/api'
import { Announcement } from '../API/Paths';

import StatusHandler from '../Utils/StatusHandler';
import { toastposition, toastvariant } from './Packages';
  
const AddModal = ({ isOpen, onClose, fetch }) => {
  const title = 'Post Announcement';

  const toast = useToast();
  const [loader, setLoader] = useState(false);

  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [fileupload, setFileUpload] = useState('');

  const handleChange = (file) => {
    setFileUpload(file[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let msg = '';

    const formData = new FormData();
    formData.append('Type', type);
    formData.append('Details', details);
    formData.append('FileUpload', fileupload);

    console.log(fileupload)

    PostRequest({ url: Announcement }, formData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        onClose();
        setType('');
        setDetails('');
        setFileUpload('');
        fetch(true);

        toast({
          title: 'Posted a new announcement!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
        msg = 'success';
      })
      .catch(err => {
        toast({
          title: 'Failed to post announcement!',
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
        msg = StatusHandler(err);
      });
  };

return (
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
          <FormControl isRequired>
            <FormLabel htmlFor="announcementType" fontSize="sm">
              Announcement Type
            </FormLabel>

            <Select
              placeholder="Select Type"
              size="sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              // onChange={e => { setType(e.target.value);}}
            >
              <option value={"announcement"}>Announcement</option>
              <option value={"memo"}>Memorandum Order</option>
              <option value={"activity"}>Activity</option>
              <option value={"request"}>Request</option>
            </Select>
          </FormControl>

          <FormControl isRequired mt={5}>
            <FormLabel htmlFor="postDetails" fontSize="sm">
              Details
            </FormLabel>
            <Textarea
              size="sm"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              // onChange={e => { setDetails(e.target.value);}}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="postPicture" fontSize="sm">
              Upload Image
            </FormLabel>
            
            <Input
              name='image'
              id='image'
              type="file"
              // value={fileUpload}
              // onChange={e => handleChange(e.target.files)}
              files={fileupload}
              onChange={(e) => setFileUpload(e.target.files)}
            />
          </FormControl>
        </GridItem>
      </Grid>
    </CustomModal>
  </>
)};

const Announcements = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetch, setFetch] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const { search, setSearch } = useAuth();
  const Title = 'Post Announcement';

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
      accessor: 'Details',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  const handleFetchAnnouncement = async () => {
    GetRequest({ url: Announcement })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const { data } = res;

        if (data.length === announcements.length) {
          return;
        }
        setAnnouncements(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //SearchFilter
  const filtered = announcements.filter(filter =>
      filter.Type.toLowerCase().includes(search.toLowerCase()) ||
      filter.Details.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (fetch) {
        setFetch(false);
      }
      handleFetchAnnouncement();
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
             fetch={setFetch}
             data={filtered}
             search={search}
             setSearch={setSearch}
             isModal={true}
             onOpen={onOpen}
          />
        </Box>
      </Container>

      <AddModal isOpen={isOpen} onClose={onClose} fetch={setFetch} />
    </>
  );
};

export default Announcements;
