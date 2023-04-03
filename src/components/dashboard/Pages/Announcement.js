import { useState, useEffect, useRef, useMemo } from "react";

import {
  Box,
  Heading,
  Center,
  Container,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineAnnouncement } from "react-icons/md";

import {
  CustomTablePaginate,
  TitleColor,
  CustomModal,
  toastposition,
  toastvariant,
} from "../Packages";

import AnnouncementPost from "../Component/Announcement/AnnouncementPost";
import PostAnnouncement from "../Component/Announcement/PostAnnouncement";
import { useTable } from "react-table";

const Announcement = () => {
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetch, setFetch] = useState(false);

  const [users, setUsers] = useState([]);
  // const [hospitals, setHospitals] = useState([]);
  // const [doctor, setDoctor] = useState([]);

  // const handleFetchDoctor = async () => {
  //   const res = await DoctorGetRequest();

  //   if (res.data.status == 200) {
  //     setDoctor(res.data.data);
  //   }
  // };

  // const serviceTypeData = async () => {
  //   const json = await SpecializationGetRequest({ params: {} });
  //   if (json === null) {
  //     return;
  //   }
  //   setSpecializationData(json.data.data);
  // };

  // const Doctors = doctor.filter(
  //   (filter) =>
  //     filter.profile_LastName.toLowerCase().includes(search.toLowerCase()) ||
  //     filter.profile_FirstName.toLowerCase().includes(search.toLowerCase()) ||
  //     filter.email.toLowerCase().includes(search.toLowerCase()) ||
  //     filter.hospital_Name.toLowerCase().includes(search.toLowerCase())
  // );

  //check if theres a changes. then update the data
  // useEffect(() => {
  //   serviceTypeData();
  //   handleFetchDoctor();
  //   setFetch(false);
  // }, [fetch]);

  const Title = "Announcement";

  const column = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
    ],
    []
  );

  // const column = useMemo(
  //   () => [
  //     {
  //       Header: "ID",
  //       accessor: "id",
  //     },
  //     {
  //       Header: "PROFILE",
  //       accessor: "profile",
  //     },
  //     {
  //       Header: "FIRST NAME",
  //       accessor: "FirstName",
  //     },
  //     {
  //       Header: "LAST NAME",
  //       accessor: "LastName",
  //     },
  //     {
  //       Header: "ACTION",
  //       accessor: "action",
  //     },
  //   ],
  //   []
  // );

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={5} p={[0, 0, 5, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <MdOutlineAnnouncement fontSize={35} fontWeight={"900"} ml={5} />
              <Text fontSize={30} fontWeight={"900"}>
                {Title}
              </Text>
            </Flex>
          </Box>

          <Box mt={"2rem"}>
            <CustomTablePaginate
              title={"Navigator"}
              columns={column}
              // data={Doctors}
              // SpecializationData={SpecializationData}
              // hospitalData={hospitalData}
              fetch={setFetch}
              search={search}
              setSearch={setSearch}
              onOpen={onOpen}
              isModal={true}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Announcement;
