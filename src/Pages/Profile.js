import { useState } from "react";

import { 
  useToast, 
  Box,
  Heading,
  Divider, 
  Stack, 
  Container, 
  Center, 
  Image, 
  Table, 
  Tr, 
  Th, 
  Td, 
  Button, 
  Spacer,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormHelperText,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";


import useAuth from '../Hooks/AuthContext';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { IoKeySharp } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';
import { CustomFormController } from '../Components/Custom';
import { toastposition, toastvariant } from '../Pages/Packages';
import { FaLock } from 'react-icons/fa';
import { PutRequest } from '../API/api';
import { Profile } from '../API/Paths';
import StatusHandler from '../Utils/StatusHandler'

import CTE_logo from "../Media/samplepic.jpg";
import { type } from "@testing-library/user-event/dist/type";

const Profiles = () => {
  const toast = useToast();
  const { user } = useAuth();

  const [editable, setEditable] = useState(false);

  const [firstName, setFirstName] = useState(user === null ? '' : user.FirstName);
  const [lastName, setLastName] = useState(user === null ? '' : user.LastName);
  const [middleName, setMiddleName] = useState(user === null ? '' : user.MiddleName);
  const [birthDate, setBirthDate] = useState(user === null ? '' : user.BirthDate);
  const [civilStatus, setCivilStatus] = useState(user === null ? '' : user.CivilStatus);
  const [gender, setGender] = useState(user === null ? '' : user.Gender);
  const [religion, setReligion] = useState(user === null ? '' : user.Religion);
  const [address, setAddress] = useState(user === null ? '' : user.Address);
  const [zipCode, setZipCode] = useState(user === null ? '' : user.ZipCode);

  const [employmentID, setEmploymentID] = useState(user === null ? '' : user.EmploymentID);
  const [prcID, setPrcID] = useState(user === null ? '' : user.PrcID);
  const [department, setDepartment] = useState(user === null ? '' : user.Department);
  const [collegeTitle, setCollegeTitle] = useState(user === null ? '' : user.CollegeTitle);

  const [schoolName, setSchoolName] = useState(user === null ? '' : user.SchoolName);
  const [course, setCourse] = useState(user === null ? '' : user.Course);
  const [periodAttendedStart, setPeriodAttendedStart] = useState(user === null ? '' : user.PeriodAttendedStart);
  const [periodAttendedEnd, setPeriodAttendedEnd] = useState(user === null ? '' : user.PeriodAttendedEnd);


  const onSave = e => {
    e.preventDefault();
    let msg = '';

    let bodyFormData = new FormData();
    bodyFormData.append('profile_id ', user.profile_id);
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
    <Container maxW={'container.xxl'}>
      <Box mt={5} p={[0, 0, 2, 3]}>
        <Heading size="lg" mb={5}>
          Profile
        </Heading>
        <Stack direction={["column", "column", "column", "row"]}>
          <Box
            bgColor="gray.50"
            h="100%"
            pb={2}
            borderRadius={25}
            w={["80vw", "300px"]}
          >
            <Center flexDirection="column" p={5}>
              <Image
                boxSize="175px"
                src={CTE_logo}
                objectFit="cover"
                borderRadius="full"
                mb={5}
              />
              <Heading size="sm">{lastName + ", " + firstName + " " + middleName}</Heading>
            </Center>
            <Table size="sm" variant="unstyled">
              <Tr>
                <Th>College Title</Th>
                <Td>{ collegeTitle }</Td>
              </Tr>
              <Tr>
                <Th>Department</Th>
                <Td>{ department }</Td>
              </Tr>
            </Table>
            <Center>
              <Button m={2} colorScheme="blueCTE" w="90%">
                Logout
              </Button>
            </Center>
          </Box>

          <form onSubmit={onSave}>
          <Stack w={["80vw", "54vw"]}>
            <Stack spacing={5}>
              {/* <Stack direction="row" pos="sticky" top="5" zIndex="1">
                <Spacer />
                <Button
                  colorScheme="red"
                  onClick={() => {
                    toast({
                      title: "Changes Discarded",
                      status: "warning",
                      position: "top",
                      duration: 5000,
                      isClosable: true,
                    });
                  }}
                >
                  Discard
                </Button> 
                <Button
                  colorScheme={editable ? "yellow" : "green"}
                  onClick={() => {
                    setEditable(!editable);
                    editable
                      ? toast({
                          title: "Editing enabled",
                          status: "info",
                          position: "top",
                          duration: 5000,
                          isClosable: true,
                        })
                      : 
                      toast({
                          title: "Information saved!",
                          status: "success",
                          position: "top",
                          duration: 5000,
                          isClosable: true,
                        });
                  }}
                >
                  {editable ? "Edit" : "Save" }
                </Button>
              </Stack> */}

              {/* Personal Information */}
              <Box bgColor="gray.50" borderRadius={25} p={5}>
                <Heading size="md" color="gray.500" mb={5}>
                  Personal Information
                </Heading>
                <Flex flexDirection={["column", "row"]}>
                  <Box w="100%" pr={[0, 5]}>
                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Input
                        isReadOnly={editable}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input isReadOnly={editable} 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mb={5}>
                      <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                      <Input isReadOnly={editable}
                       value={middleName}
                       onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </FormControl>
                  </Box>

                  <Box w="100%">
                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="birthdate">Birthdate</FormLabel>
                      <Input
                        isReadOnly={editable}
                        id="birthdate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}

                      />
                    </FormControl>
                    {/* <FormControl mb={5} isRequired>
                      <FormLabel htmlFor='civilStatus'>Civil Status</FormLabel>
                      <Input isReadOnly={editable} id='civilStatus' />
                    </FormControl> */}

                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="civilStatus">Civil Status</FormLabel>
                      <Input isReadOnly={editable} 
                      value={civilStatus}
                      onChange={(e) => setCivilStatus(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="gender">Gender</FormLabel>
                      <Select isReadOnly={editable}
                       value={gender}
                       onChange={(e) => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                      {/* <Input isReadOnly={editable} id='gender' /> */}
                    </FormControl>

                    <FormControl mb={5}>
                      <FormLabel htmlFor="religion">Religion</FormLabel>
                      <Input isReadOnly={editable} 
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </Flex>

                <FormControl mb={5} isRequired>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input isReadOnly={editable}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  />
                  <FormHelperText>
                    House/Block/Lot No., Street, Subdivision/Village, Barangay,
                    City/Municipality, Province
                  </FormHelperText>
                </FormControl>

                <FormControl mb={5} isRequired w="50%">
                  <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                  <Input isReadOnly={editable} 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  />
                </FormControl>
              </Box>

              {/* Employment Information */}
              <Box bgColor="gray.50" borderRadius={25} p={5}>
                <Heading size="md" color="gray.500" mb={5}>
                  Employment Information
                </Heading>
                <Flex flexDirection={["column", "row"]}>
                  <Box w="100%" pr={[0, 5]}>
                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="employmentID">
                        WMSU Employment ID No.
                      </FormLabel>
                      <Input isReadOnly={editable} 
                      value={employmentID} 
                      onChange={(e) => setEmploymentID(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="licenseID">PRC License ID No.</FormLabel>
                      <Input isReadOnly={editable} 
                      value={prcID}
                      onChange={(e) => setPrcID(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box w="100%">

                    <FormControl mb={5}>
                      <FormLabel htmlFor="department">Department</FormLabel>
                      <Input isReadOnly={editable} 
                      value={department} 
                      onChange={(e) => setDepartment(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mb={5}>
                      <FormLabel htmlFor="collegeTitle">College Title</FormLabel>
                      <Input isReadOnly={editable} 
                      value={collegeTitle}
                      onChange={(e) => setCollegeTitle(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </Flex>
              </Box>

              {/* Educational Background */}
              <Box bgColor="gray.50" borderRadius={25} p={5}>
                <Heading size="md" color="gray.500" mb={5}>
                  Educational Background (College Level)
                </Heading>
                <Flex flexDirection={"column"}>
                  <Box w="100%">
                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="collegeSchoolName">Name of School</FormLabel>
                      <Input isReadOnly={editable} 
                      value={schoolName} 
                      onChange={(e) => setSchoolName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="bachelorDegree">Course</FormLabel>
                      <Input isReadOnly={editable} 
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mb={5} isRequired>
                      <FormLabel htmlFor="periodOfAttendance">
                        Period of Attendance
                      </FormLabel>

                      <Flex flexDirection={["column", "row"]}>
                        <NumberInput 
                        min={1900} max={2099}>
                        <NumberInputField 
                          value={periodAttendedStart}
                          onChange={(e) => setPeriodAttendedStart(e.target.value)}
                          />
                        </NumberInput>

                        <Text m={2}>To</Text>

                        <NumberInput
                            min={1900} max={2099}>
                          <NumberInputField 
                          value={periodAttendedEnd}
                          onChange={(e) => setPeriodAttendedEnd(e.target.value)}
                          />
                        </NumberInput>
                      </Flex>
                    </FormControl>
                  </Box>
                </Flex>
              </Box>
              {/* Security */}
              {/* <Box bgColor="gray.50" borderRadius={25} p={5}>
                <Heading size="md" color="gray.500" mb={5}>
                  Security
                </Heading>
                <Flex flexDirection={["column", "row"]}>
                  <Box w="100%">
                    <FormControl mb={5}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        isReadOnly={editable}
                        id="email"
                        type="email"
                        value={user?.email}
                      />
                    </FormControl>
                    <FormControl mb={5}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input isReadOnly={editable} id="password" type="password" />
                    </FormControl>
                  </Box>
                </Flex>
              </Box> */}
            </Stack>

            <Button
                type="Submit"
                colorScheme={'blue'}
                fontWeight={'normal'}
                bg={'blue.900'}
                _hover={{
                  bg: 'blue.900',
                }}
                _active={{
                  bg: 'blue.900',
                }}
                variant={'solid'}
                size={'sm'}
                mt={4}
              >
                Save
              </Button>
          </Stack>
          </form>

        </Stack>
      </Box>
    </Container>
  );
}

export default Profiles;

