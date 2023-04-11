import React from "react";
import {
  Text,
  IconButton,
  Flex,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import moment from "moment";
import { CgDetailsMore } from "react-icons/cg";

import CustomModal from "../CustomModal";


export const CustomViewButton = ({ title, data, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton color={"blue.400"} onClick={onOpen}>
        <CgDetailsMore />
      </IconButton>

      <CustomModal
        /*   title={"Patient Information"} */
        isOpen={isOpen}
        onClose={onClose}
        //  onSave={}
        hasProfile={false}
        isNew={false}
        isView={true}
      >
        {data
          .filter((e) => e.id == id[0].id)
          .map((row) => {
            return (
              <>
                <Stack p={5} fontSize={15}>
                  <Flex key={1}>
                    <Text
                      mb={5}
                      fontSize={20}
                      textTransform={"uppercase"}
                      fontWeight={"bold"}
                    >
                      {row.FirstName +
                        " " +
                        row.MiddleName +
                        " " +
                        row.LastName}
                    </Text>
                    <Spacer />
                    <Text fontSize={12} color={"gray.500"}>
                      {moment().format("@hh:mm a MM-DD-YYYY")}
                    </Text>
                  </Flex>

                  
                  <Flex key={4}>
                    <Text fontSize={15}>Birthday:</Text>
                    <Spacer />
                    <Text mr={5}>
                      {moment(row.BirthDate).format("MMM DD ,YYYY")}
                    </Text>
                  </Flex>
                  
                  <Flex key={3}>
                    <Text fontSize={15}>Civil Status :</Text>
                    <Spacer />
                    <Text mr={5}>{row.CivilStatus}</Text>
                  </Flex>

                  <Flex key={2}>
                    <Text fontSize={15}>Gender:</Text>
                    <Spacer />
                    <Text mr={5}>{row.Gender}</Text>
                  </Flex>

                  <Flex key={5} mt={2}>
                    <Text fontSize={15}>Religion:</Text>
                    <Spacer />
                    <Text mr={5}>{row.Religion}</Text>
                  </Flex>

                  <Flex key={6} mt={2}>
                    <Text fontSize={15}>Address:</Text>
                    <Spacer />
                    <Text mr={5}>{row.Address}</Text>
                  </Flex>

                  <Flex key={7} mt={2}>
                    <Text fontSize={15}>Zip Code :</Text>
                    <Spacer />
                    <Text mr={5}>{row.ZipCode}</Text>
                  </Flex>
                </Stack>

                <Stack p={5} key={9} fontSize={15}>
                  <Text textTransform={"uppercase"} color={"blue.800"}>
                    Employment Information
                  </Text>

                  <Flex key={8} mt={2}>
                    <Text fontSize={15}>Employment ID No. :</Text>
                    <Spacer />
                    <Text mr={5}>{row.EmploymentID}</Text>
                  </Flex>

                  <Flex key={8} mt={2}>
                    <Text fontSize={15}>PRC ID No. :</Text>
                    <Spacer />
                    <Text mr={5}>{row.PrcID}</Text>
                  </Flex>

                  <Flex key={8} mt={2}>
                    <Text fontSize={15}>Department :</Text>
                    <Spacer />
                    <Text mr={5}>{row.Department}</Text>
                  </Flex>

                  <Flex key={8} mt={2}>
                    <Text fontSize={15}>College Title :</Text>
                    <Spacer />
                    <Text mr={5}>{row.Degree}</Text>
                  </Flex>
                </Stack>

                <Stack p={5} key={9} fontSize={15}>
                  <Text textTransform={"uppercase"} color={"blue.800"}>
                    Educational Background (College Level)
                  </Text>

                  <Flex>
                    <Text fontSize={15}>School :</Text>
                    <Spacer />
                    <Text mr={5}>{row.SchoolName}</Text>
                  </Flex>

                  <Flex>
                    <Text fontSize={15}>Course :</Text>
                    <Spacer />
                    <Text mr={5}>{row.Course}</Text>
                  </Flex>

                  <Text>Period of Attendance :</Text>
                  <Text mr={5}> 
                    {row.PeriodAttendedStart +
                      " - " +
                      row.PeriodAttendedEnd}</Text>
                </Stack>
              </>
            );
          })}
      </CustomModal>
    </>
  );
};