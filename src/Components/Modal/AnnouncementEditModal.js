import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Select, useToast } from '@chakra-ui/react';
import { toastposition, toastvariant } from '../../Pages/Packages';
import CustomModal from '../CustomModal';
import TextFormController from '../TextFormControl';
import { StatusHandler } from '../../Utils/StatusHandler';
import { PutRequest } from '../../API/api';
import { Announcement } from '../../API/Paths';

export const AnnouncementEditModal = ({
  title,
  isOpen,
  onClose,
  data,
  fetch,
}) => {
  const toast = useToast();

  const [announcement, setAnnouncement] = useState(data === null ? '' : data.Type);
  const [details, setDetails] = useState(data === null ? '' : data.Details);
  const [fileUpload, setFileUpload] = useState(data === null ? '' : data.FileUpload);


  const onSave = e => {
    e.preventDefault();
    let msg = '';

    let bodyFormData = new FormData();
    bodyFormData.append('announcement_id', data.id);
    bodyFormData.append('Type', announcement);
    bodyFormData.append('Details', details);
    bodyFormData.append('FileUpload', fileUpload);

    PutRequest({ url: Announcement }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
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
            <FormLabel htmlFor="announcementType" fontSize="sm">
              Announcement Type
            </FormLabel>

            <Select
              placeholder="Select Type"
              size="sm"
              value={announcement}
              setValue={setAnnouncement}
              onChange={(e) => setAnnouncement(e.target.value)}
            >
              <option value={"announcement"}>Announcement</option>
              <option value={"memo"}>Memorandum Order</option>
              <option value={"activity"}>Activity</option>
              <option value={"request"}>Request</option>
            </Select>
        </FormControl>

        <TextFormController
          title={'Details'}
          value={details}
          setValue={setDetails}
          isRequired={true}
          textArea={true}
        />

        <FormControl>
            <FormLabel htmlFor="postPicture" fontSize="sm">
              Upload Image
            </FormLabel>

            <Input
              type="file"
              value={fileUpload}
              setValue={setFileUpload}
            />
        </FormControl>
      </CustomModal>
    </>
  );
};
