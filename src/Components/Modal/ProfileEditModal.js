import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Grid, GridItem, Input, Select, Text, border, useToast } from '@chakra-ui/react';
import { toastposition, toastvariant } from '../../Pages/Packages';

import CustomModal from '../CustomModal';
import { CustomFormController } from '../Custom';

import { StatusHandler } from '../../Utils/StatusHandler';
import { PutRequest } from '../../API/api';
import { Profile } from '../../API/Paths';

export const ProfileEditModal = ({
  title,
  isOpen,
  onClose,
  data,
  fetch,
}) => {
  const toast = useToast();

  const [firstName, setFirstName] = useState(data === null ? '' : data.FirstName);
  const [lastName, setLastName] = useState(data === null ? '' : data.LastName);
  const [middleName, setMiddleName] = useState(data === null ? '' : data.MiddleName);
  const [birthDate, setBirthDate] = useState(data === null ? '' : data.BirthDate);
  const [civilStatus, setCivilStatus] = useState(data === null ? '' : data.CivilStatus);
  const [gender, setGender] = useState(data === null ? '' : data.Gender);
  const [religion, setReligion] = useState(data === null ? '' : data.Religion);
  const [address, setAddress] = useState(data === null ? '' : data.Address);
  const [zipCode, setZipCode] = useState(data === null ? '' : data.ZipCode);

  const [employmentID, setEmploymentID] = useState(data === null ? '' : data.EmploymentID);
  const [prcID, setPrcID] = useState(data === null ? '' : data.PrcID);
  const [department, setDepartment] = useState(data === null ? '' : data.Department);
  const [collegeTitle, setCollegeTitle] = useState(data === null ? '' : data.Degree);

  const [schoolName, setSchoolName] = useState(data === null ? '' : data.SchoolName);
  const [course, setCourse] = useState(data === null ? '' : data.Course);
  const [periodAttendedStart, setPeriodAttendedStart] = useState(data === null ? '' : data.PeriodAttendedStart);
  const [periodAttendedEnd, setPeriodAttendedEnd] = useState(data === null ? '' : data.PeriodAttendedEnd);


  const onSave = e => {
    e.preventDefault();
    let msg = '';

    let bodyFormData = new FormData();
    bodyFormData.append('profile_id ', data.id);
    bodyFormData.append('FirstName', firstName);
    bodyFormData.append('LastName', lastName);
    bodyFormData.append('MiddleName', middleName);
    bodyFormData.append('BirthDate', birthDate);
    bodyFormData.append('CivilStatus', civilStatus);
    bodyFormData.append('Gender', gender);
    bodyFormData.append('Religion', religion);
    bodyFormData.append('Address', address);
    bodyFormData.append('ZipCode', zipCode);

    bodyFormData.append('EmploymentID', employmentID);
    bodyFormData.append('PrcID', prcID);
    bodyFormData.append('Department', department);
    bodyFormData.append('CollegeTitle', collegeTitle);

    bodyFormData.append('SchoolName', schoolName);
    bodyFormData.append('Course', course);
    bodyFormData.append('PeriodAttendedStart', periodAttendedStart);
    bodyFormData.append('PeriodAttendedEnd', periodAttendedEnd);

    PutRequest({ url: Profile }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        fetch(true);

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
        
     <Grid
        templateRows={`repeat( 2 , 1fr)`}
        templateColumns={`repeat( 2 , 1fr)`}
        gap={2}
        overflow={'hidden'}
      >
        
        <GridItem rowSpan={2} colSpan={[2, 1]}>
            <CustomFormController
                isSignup={true}
                title={'First name'}
                type={'Text'}
                value={firstName}
                placeholder={`Enter First Name `}
                setValue={setFirstName}
                errorMessage={`First name is required.`}
                children={
                    <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                    >
                    </Box>
                }
            />

            <CustomFormController
                isSignup={true}
                title={'Last name'}
                type={'Text'}
                value={lastName}
                placeholder={`Enter Last name`}
                setValue={setLastName}
                errorMessage={`Last name is required.`}
                children={
                    <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                    >
                    </Box>
                }
            />

            <CustomFormController
                isSignup={true}
                title={'Middle Name'}
                type={'Text'}
                value={middleName}
                placeholder={`Enter Middle Name`}
                setValue={setMiddleName}
                children={
                <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                >
                </Box>
                }
            />
        </GridItem>

        <GridItem rowSpan={3} colSpan={[2, 1]}>
            <CustomFormController
                isSignup={true}
                title={'Birthdate'}
                type={'date'}
                value={birthDate}
                setValue={setBirthDate}
                children={
                <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                >
                </Box>
                }
            />

            <CustomFormController
                isSignup={true}
                title={'Civil Status'}
                type={'Text'}
                value={civilStatus}
                placeholder={`Enter Civil Status`}
                setValue={setCivilStatus}
                children={
                <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                >
                </Box>
                }
            />

            <FormControl isRequired mt={5}>
                <FormLabel fontSize="md">
                Gender
                </FormLabel>

                <Select
                placeholder="Select Type"
                size="md"
                value={gender}
                setValue={setGender}
                onChange={(e) => setGender(e.target.value)}
                >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                </Select>
            </FormControl>
            
            <CustomFormController
                isSignup={true}
                title={'Religion'}
                type={'Text'}
                value={religion}
                placeholder={`Enter Religion`}
                setValue={setReligion}
                children={
                <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                >
                </Box>
                }
            />
        </GridItem>

        <GridItem rowSpan={5} colSpan={[3]}>
            <CustomFormController
                isSignup={true}
                title={'Address'}
                type={'Text'}
                value={address}
                placeholder={`Enter Address`}
                setValue={setAddress}
                children={
                <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                >
                </Box>
                }
            />

            <CustomFormController
                isSignup={true}
                title={'Zip Code'}
                type={'Text'}
                value={zipCode}
                placeholder={`Enter Zip Code`}
                setValue={setAddress}
                children={
                <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                >
                </Box>
                }
            />
        </GridItem>
      </Grid>

      <Text mt={5}> EMPLOYMENT INFORMATION </Text>


      <Grid
        templateRows={`repeat( 2 , 1fr)`}
        templateColumns={`repeat( 2 , 1fr)`}
        gap={2}
        overflow={'hidden'}
      >
         <GridItem rowSpan={2} colSpan={[2, 1]}>
            <CustomFormController
                isSignup={true}
                title={'Wmsu Employment ID No.'}
                type={'Text'}
                value={employmentID}
                placeholder={`Enter Employment ID No. `}
                setValue={setEmploymentID}
                children={
                    <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                    >
                    </Box>
                }
            />

            <CustomFormController
                isSignup={true}
                title={'PRC License ID No.'}
                type={'Text'}
                value={prcID}
                placeholder={`Enter PRC ID No.`}
                setValue={setPrcID}
                children={
                    <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                    >
                    </Box>
                }
            />
        </GridItem>

        <GridItem rowSpan={3} colSpan={[2, 1]}>
            <CustomFormController
                isSignup={true}
                title={'Department'}
                type={'Text'}
                value={department}
                placeholder={`Enter Department`}
                setValue={setDepartment}
                children={
                <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                >
                </Box>
                }
            />

            <CustomFormController
                isSignup={true}
                title={'College Title'}
                type={'Text'}
                value={collegeTitle}
                placeholder={`Enter Department`}
                setValue={setCollegeTitle}
                children={
                <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={'1px solid #e0e0e0'}
                >
                </Box>
                }
            />
        </GridItem>
      </Grid>

      <Text mt={5}> EDUCATIONAL BACKGROUND </Text>


<Grid
  templateRows={`repeat( 2 , 1fr)`}
  templateColumns={`repeat( 2 , 1fr)`}
  gap={2}
  overflow={'hidden'}
>
   <GridItem rowSpan={2} colSpan={3}>
      <CustomFormController
          isSignup={true}
          title={'Name of School'}
          type={'Text'}
          value={schoolName}
          placeholder={`Enter School Name `}
          setValue={setSchoolName}
          children={
              <Box
              w={8}
              h={4}
              mt={6}
              mb={6}
              borderRight={'1px solid #e0e0e0'}
              >
              </Box>
          }
      />

      <CustomFormController
          isSignup={true}
          title={'Course'}
          type={'Text'}
          value={course}
          placeholder={`Enter Course`}
          setValue={setCourse}
          children={
              <Box
              w={8}
              h={4}
              mt={6}
              mb={6}
              borderRight={'1px solid #e0e0e0'}
              >
              </Box>
          }
      />

    <CustomFormController
          isSignup={true}
          title={'Period Attendance Start'}
          type={'number'}
          value={periodAttendedStart}
          placeholder={`Enter Period Attendance Started`}
          setValue={setPeriodAttendedStart}
          children={
              <Box
              w={8}
              h={4}
              mt={6}
              mb={6}
              borderRight={'1px solid #e0e0e0'}
              >
              </Box>
          }
      />

    <CustomFormController
          isSignup={true}
          title={'Period Attendance End'}
          type={'number'}
          value={periodAttendedEnd}
          placeholder={`Enter Period Attendance End`}
          setValue={setPeriodAttendedEnd}
          children={
              <Box
              w={8}
              h={4}
              mt={6}
              mb={6}
              borderRight={'1px solid #e0e0e0'}
              >
              </Box>
          }
    />
  </GridItem>
</Grid>

      </CustomModal>
    </>
  );
};
