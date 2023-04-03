import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Select,
  Spacer,
  useToast,
  FormHelperText,
  NumberInput,
  NumberInputField,
  Text,
  Divider,
  Center,
} from "@chakra-ui/react";

import useAuth from "../../../context/AuthContext";

import CustomFormController from "../../../authentication/customs/CustomFormController";
import { ProfileGetRequest } from "../../../api/Profile_Request";

export default function ProfileCard(props) {
  const toast = useToast();
  const [editable, setEditable] = useState(true);

  const [profiles, setProfiles] = useState({});

  const [fetch, setFetch] = useState(false);

  const {
    user,
    setUser,
    // profile,
    // setProfile,
    // FirstName,
    // setFirstName,
    // MiddleName,
    // setMiddleName,
    // BirthDate,
    // setBirthDate,
    // CivilStatus,
    // setCivilStatus,
    // Gender,
    // setGender,
    // Religion,
    // setReligion,
    // Address,
    // setAddress,
    // ZipCode,
    // setZipCode,
    // EmploymentID,
    // setEmploymentID,
    // PrcID,
    // setPrcID,
    // Department,
    // setDepartment,
    // CollegeTitle,
    // setCollegeTitle,
    // SchoolName,
    // setSchoolName,
    // Course,
    // setCourse,
    // PeriodAttendedStart,
    // setPeriodAttendedStart,
    // PeriodAttendedEnd,
    // setPeriodAttendedEnd,
    // isErrorFN,
  } = useAuth();

  const handleFetchUser = async () => {
    const res = await ProfileGetRequest();

    if (res.data.status === 200) {
      setProfiles(res.data.data);
    }
  };

  useEffect(() => {
    handleFetchUser();
    setFetch(false);
  }, [fetch]);

  return (
    <Stack spacing={5}>
      <Stack direction="row" pos="sticky" top="5" zIndex="1">
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
              : toast({
                  title: "Information saved!",
                  status: "success",
                  position: "top",
                  duration: 5000,
                  isClosable: true,
                });
          }}
        >
          {editable ? "Edit" : "Save"}
        </Button>
      </Stack>
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
                id="lastName"
                value={profiles.LastName}
              />
            </FormControl>

            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input isReadOnly={editable} id="firstName" />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel htmlFor="middleName">Middle Name</FormLabel>
              <Input isReadOnly={editable} id="middleName" />
            </FormControl>
          </Box>

          <Box w="100%">
            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="birthdate">Birthdate</FormLabel>
              <Input
                isReadOnly={editable}
                id="birthdate"
                type="date"
                value={profiles}
              />
            </FormControl>
            {/* <FormControl mb={5} isRequired>
              <FormLabel htmlFor='civilStatus'>Civil Status</FormLabel>
              <Input isReadOnly={editable} id='civilStatus' />
            </FormControl> */}

            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="civilStatus">Civil Status</FormLabel>
              <Select isReadOnly={editable} id="civilStatus">
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="separated">Separated</option>
                <option value="other">Other/s</option>
              </Select>
            </FormControl>

            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <Select isReadOnly={editable} id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
              {/* <Input isReadOnly={editable} id='gender' /> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel htmlFor="religion">Religion</FormLabel>
              <Input isReadOnly={editable} id="religion" />
            </FormControl>
          </Box>
        </Flex>
        <FormControl mb={5} isRequired>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input isReadOnly={editable} id="address" />
          <FormHelperText>
            House/Block/Lot No., Street, Subdivision/Village, Barangay,
            City/Municipality, Province
          </FormHelperText>
        </FormControl>
        <FormControl mb={5} isRequired w="50%">
          <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
          <Input isReadOnly={editable} id="zipCode" />
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
              <Input isReadOnly={editable} id="employmentID" />
            </FormControl>
            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="licenseID">PRC License ID No.</FormLabel>
              <Input isReadOnly={editable} id="licenseID" />
            </FormControl>
          </Box>
          <Box w="100%">
            <FormControl mb={5}>
              <FormLabel htmlFor="department">Department</FormLabel>
              <Input isReadOnly={editable} id="department" />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel htmlFor="collegeTitle">College Title</FormLabel>
              <Input isReadOnly={editable} id="collegeTitle" />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel htmlFor="employmentDate">Employment date</FormLabel>
              <Input isReadOnly={editable} id="employmentDate" />
            </FormControl>
          </Box>
        </Flex>
      </Box>

      {/* Educational Background */}
      <Box bgColor="gray.50" borderRadius={25} p={5}>
        <Heading size="md" color="gray.500" mb={5}>
          Educational Background
        </Heading>
        <Flex flexDirection={"column"}>
          <Box w="100%">
            <Heading size="sm" color="gray.600" pb={2}>
              College Level
            </Heading>
            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="collegeSchoolName">Name of School</FormLabel>
              <Input isReadOnly={editable} id="collegeSchoolName" />
            </FormControl>
            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="bachelorDegree">Course</FormLabel>
              <Input isReadOnly={editable} id="bachelorDegree" />
            </FormControl>
            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="periodOfAttendance">
                Period of Attendance
              </FormLabel>
              <Flex flexDirection={["column", "row"]}>
                <NumberInput defaultValue={1900} min={1900} max={2099}>
                  <NumberInputField />
                </NumberInput>
                <Text m={2}>To</Text>
                <NumberInput defaultValue={2099} min={1900} max={2099}>
                  <NumberInputField />
                </NumberInput>
              </Flex>
            </FormControl>
          </Box>
          <Divider my={2} />
          <Box w="100%">
            <Heading size="sm" color="gray.600" pb={2}>
              Graduate Studies
            </Heading>

            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="collegeSchoolName">Name of School</FormLabel>
              <Input isReadOnly={editable} id="collegeSchoolName" />
            </FormControl>
            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="bachelorDegree">Course</FormLabel>
              <Input isReadOnly={editable} id="bachelorDegree" />
            </FormControl>
            <FormControl mb={5} isRequired>
              <FormLabel htmlFor="periodOfAttendance">
                Period of Attendance
              </FormLabel>
              <Flex flexDirection={["column", "row"]}>
                <NumberInput defaultValue={1900} min={1900} max={2099}>
                  <NumberInputField />
                </NumberInput>
                <Text m={2}>To</Text>
                <NumberInput defaultValue={2099} min={1900} max={2099}>
                  <NumberInputField />
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
  );
}
