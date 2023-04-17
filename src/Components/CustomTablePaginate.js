import { useTable, usePagination } from "react-table";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  Box,
  Badge,
  Button,
} from "@chakra-ui/react";

import { MdOutlineMessage } from "react-icons/md";

import useAuth from "../Hooks/AuthContext";
import Searchfield from "../Components/Searchfield";
import TableRow from "./Table/TableRow";

import SearchNotFound from "../Components/SearchNotFound";

import { BiReset } from "react-icons/bi";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

import {
  CustomViewButton,
  CustomEditButton,
  CustomDeleteButton,
} from "../Pages/Packages";

import "../Style/Table.css";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const CustomTablePaginate = ({
  title,
  columns,
  data,
  fetch,
  announcementData,
  // hospitalData,
  profiles,
  onOpen,
  search,
  setSearch,
  handleClick,
  isModal,
  child,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  const { user } = useAuth();

  const Actions = ({
    title,
    fetch,
    rawData,
    announcementData,
    // hospitalData,
    cellvalue,
    row,
  }) => {
    const navigate = useNavigate();

    const handleResetPassword = async () => {
      // const res = UserResetPassword({ email: row.email });
    };

    return (
      <>
        {title === "User" ? (
          <>
            <IconButton
              className="btn-message"
              fontSize={17}
              fontWeight={"normal"}
              color={"blue.400"}
              onClick={() => handleResetPassword()}
            >
              <BiReset />
            </IconButton>
          </>
        ) : null}
        {title == "Announcements" ? (
          <>
            <IconButton
              className="btn-message"
              fontSize={17}
              fontWeight={"normal"}
              color={"blue.400"}
            >
              <MdOutlineMessage />
            </IconButton>
          </>
        ) : null}
      </>
    );
  };

  const CustomBtnTheme = {
    backgroundColor: "#2b46e0",
    borderRadius: "52px",
    fontSize: "20px",
  };

  let i = pageIndex * 10;

  return (
    <>
      <Box w={"100%"}>
        <Flex
          justifyContent={"space-between"}
          flexDirection={["column", "column", "row", "row"]}
        >
          <Searchfield
            search={search}
            placeholder={`Search ${title}`}
            currsearch={setSearch}
          />
          <Box>
            <Flex columnGap={3} justifyContent={"end"}>
              {(user.user_role === "Super Admin" && title === "User" || title === "Post Announcement" && user.user_role !== 'User'  ||
              title === "Schedule" && user.user_role === 'User' || title === "Request" && user.user_role === 'User' || title === "Staff") ? (
                <Button
                  size={"sm"}
                  fontSize={14}
                  bg={"#526bf2"}
                  colorScheme={"blue"}
                  color={"white"}
                  variant={"solid"}
                  fontWeight={"normal"}
                  className={""}
                  onClick={isModal ? onOpen : handleClick}
                  columnGap={2}
                  mt={5}
                >
                  <IoAddCircleOutline fontSize={20} marginRight="5px" />
                  {title}
                </Button>
              ) : null}

              {child !== null ? child : null}

              <Select
                w={32}
                mt={5}
                size={"sm"}
                value={pageSize}
                focusBorderColor={"gray.400"}
                borderRadius={5}
                onChange={(e) => {setPageSize(Number(e.target.value));}}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option fontSize={14} key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Select>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <div className="table-responsive">
        <Table
          mt={5}
          className={"table"}
          variant="unstyled"
          {...getTableProps()}
        >
          <Thead className="">
            {headerGroups.map((headerGroup) => (
              <Tr fontSize={13} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    bg={"blue.100"}
                    color={"gray.600"}
                    fontSize={14}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.length >= 1 ? (
               <TableRow
               page={page}
               prepareRow={prepareRow}
               pageIndex={pageIndex}
               title={title}
               profiles={profiles}
               announcementData={announcementData}
               data={data}
               fetch={fetch}
             />
          
            ) : (
              // <SearchNotFound />
              null
            )}
          </Tbody>
        </Table>
      </div>

      {page.length >= 1 ? (
        <Flex justifyContent={"end"} mt={5}>
          <div id="btnleft">
            <Tooltip label="First Page">
              <IconButton
                style={CustomBtnTheme}
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </div>

          <Box bg={"white.200"} p={2} borderRadius={5}>
            <Flex>
              <Box fontSize={13}>Page</Box>
              <Text fontWeight="bold" fontSize={13} ml={2} as="span">
                {pageIndex + 1}
              </Text>
              <Box ml={2} fontSize={13} w={"2rem"}>
                of
              </Box>

              <Text fontSize={13} fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Flex>
          </Box>

          <div id="btnright">
            <Tooltip label="Next Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </div>
        </Flex>
      ) : (
        ""
      )}
    </>
  );

};

export default CustomTablePaginate;
