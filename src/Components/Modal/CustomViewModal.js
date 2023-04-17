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
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        //  onSave={}
        hasProfile={false}
        isNew={false}
        isView={true}
      >
        { title == 'Request' ? (
            data.filter((e) => e.id == id[0].id)
              .map((row) => {
                return (
                  <>
                    <Stack p={5} fontSize={15}>
                      <Flex key={3}>
                        <Text fontSize={15}>Request Type: { row.Type } </Text>
                        <Spacer />
                        <Text mr={5} fontWeight={"bold"}>
                         {row.Status}
                        </Text>
                      </Flex>
    
                      <Flex key={5}>
                        <Text fontSize={15}>Description: 
                          <Text>{row.Description}</Text>
                        </Text>
                      </Flex>
                    </Stack>
                  </>
                );
              })
            
          ) : title == 'Post Announcement' ? (
            data.filter((e) => e.id == id[0].id)
            .map((row) => {
              return (
                <>
                  <Stack p={5} fontSize={15}>
                    <Flex key={3}>
                      <Text fontSize={15}>Request Type : { row.Type } </Text>
                      <Spacer />
                      <Text mr={5} fontWeight={"bold"}>
                       From : { row.LastName + ", " + row.FirstName }
                      </Text>
                    </Flex>
  
                    <Flex key={5}>
                      <Text fontSize={15}>Description : 
                        <Text>{row.Details}</Text>
                      </Text>
                    </Flex>
                  </Stack>
                </>
              );
            })
          ) : title == 'Staff' ? (
            data
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
                      <Text fontSize={15}>Birthday: {moment(row.BirthDate).format("MMM DD ,YYYY")} </Text>
                      <Spacer />
                      <Text fontSize={15}>Civil Status : {row.CivilStatus}</Text>
                    </Flex>
  
                    <Flex key={2}>
                      <Text fontSize={15}>Gender: {row.Gender}</Text>
                      <Spacer />
                      <Text fontSize={15}>Religion: {row.Religion}</Text>
                    </Flex>
  
                    <Flex key={6} mt={2}>
                      <Text fontSize={15}>Address: {row.Address}</Text>
                      <Spacer />
                      <Text fontSize={15}>Zip Code : {row.ZipCode}</Text>
                    </Flex>
                  </Stack>
  
                  <Stack p={5} key={9} fontSize={15}>
                    <Text textTransform={"uppercase"} color={"blue.800"}>
                      Employment Information
                    </Text>
  
                    <Flex key={8} mt={2}>
                      <Text fontSize={15}>Employment ID No. : {row.EmploymentID}</Text>
                      <Spacer />
                      <Text fontSize={15}>PRC ID No. : {row.PrcID}</Text>
                    </Flex>
  
                    <Flex key={8} mt={2}>
                      <Text fontSize={15}>Department : {row.Department}</Text>
                      <Spacer />
                      <Text fontSize={15}>College Title : {row.Degree}</Text>
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
  
                    <Text>Period of Attendance : {row.PeriodAttendedStart +
                        " - " +
                        row.PeriodAttendedEnd}</Text>
                      
                  </Stack>
                </>
              );
            })
          ) : (
            null
          )}
      </CustomModal>
    </>
  );
};