import {
  Avatar,
  Badge,
  Box,
  Text,
  Tr,
  Td,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { MdOutlineMessage } from 'react-icons/md';
import { BiReset } from 'react-icons/bi';

import { PutRequest } from '../../API/api';
import { User } from '../../API/Paths';
import { CustomViewButton } from '../Modal/CustomViewModal';
import { CustomEditButton, CustomDeleteButton } from '../Modal/ActionModal';

import useAuth from '../../Hooks/AuthContext';

const Actions = ({
  title,
  fetch,
  rawData,
  announcementData,
  profileData,
  // hospitalData,
  cellvalue,
  row,
  props,
  user,
}) => {
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    PutRequest({ url: `${User}/reset` }, { email: row.email })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response', { cause: res });
        }

        console.log('Password Reset.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {title === 'User' && user.user_role === 'Super Admin' ? (
        <>
          <IconButton
            className="btn-message"
            fontSize={17}
            fontWeight={'normal'}
            color={'blue.400'}
            onClick={() => handleResetPassword()}
          >
            <BiReset />
          </IconButton>
        </>
      ) : null}

      {title === 'Case' ? (
        <>
          <IconButton
            className="btn-message"
            fontSize={17}
            fontWeight={'normal'}
            color={'blue.400'}
            onClick={() => {
              navigate('/staff/staff-show', {
                state: {
                  data: cellvalue,
                  rawData: props.data.filter(
                    x => x.id === cellvalue.id
                  ),
                },
              });
            }}
          >
            <MdOutlineMessage />
          </IconButton>
        </>
      ) : null}

      {title === 'User' || title == 'Post Announcement' || title == 'Staff' || title == 'Request' || title == 'Schedule'  ? (
        <CustomEditButton
          title={title}
          data={cellvalue}
          fetch={fetch}
          rawData={props.data}
          announcementData={props.announcementData}
          profileData={props.profileData}
          row={row}
        />
      ) : null}


      {title !== 'Users' ? (
        <CustomDeleteButton fetch={fetch} title={title} id={[cellvalue]} />
      ) : null}
    </>
  );
};

const TableRow = props => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { user_role } = user;
  
  const handleClick = (e, data) => {
    e.preventDefault();
    if (props.title.toLowerCase().includes('case')) {
      navigate('/case-view', { state: data });
    }
  };

  return (
    <>
      {props.page.map((row, i) => {
        props.prepareRow(row);
        return (
          <Tr
            onClick={e => handleClick(e, row.original)}
            className="td"
            {...row.getRowProps()}
          >
            {row.cells.map(cell => {
              return (
                <Td textAlign={"left"} {...cell.getCellProps()}>
                  {cell.column.id === 'action' ? (
                    <Flex columnGap={3}>
                      {props.title === 'Staff' || props.title === 'Profile' || props.title === 'Announcement'
                      || props.title === 'Request' ?  (
                        <CustomViewButton
                          title={props.title}
                          data={props.data}
                          id={[cell.row.values]}
                        />
                      ) : (
                        ''
                      )}

                      {props.title === 'User' ? (
                        user.user_role === 'Super Admin' ||
                          user.user_role === 'Admin' ? (
                          /* Restrict Admin */
                          <>
                            <Actions
                              title={props.title}
                              cellvalue={cell.row.values}
                              fetch={props.fetch}
                              rawData={props.data}
                              announcementData={props.announcementData}
                              row={row.values}
                              props={props}
                              user={user}
                            />
                          </>
                        ) : (
                          <>
                            <Actions
                              title={props.title}
                              cellvalue={cell.row.values}
                              fetch={props.fetch}
                              rawData={props.data}
                              announcementData={props.announcementData}
                              row={row.values}
                              props={props}
                              user={user}
                            />
                          </>
                        )
                      ) : (
                        <>
                          <Actions
                            title={props.title}
                            cellvalue={cell.row.values}
                            fetch={props.fetch}
                            rawData={props.data}
                            announcementData={props.announcementData}
                            row={row.values}
                            props={props}
                            user={user}
                          />
                        </>
                      )}
                    </Flex>
                  ) : cell.column.Header === 'ID' ? (
                    <Box display="flex" columnGap={3}>
                      <Text>{cell.row.values.id}</Text>
                    </Box>
                  ) : cell.column.id === 'profile' ? (
                    <>
                      <Avatar
                        size="sm"
                        src={
                          cell.row.values.profile === 'NONE'
                            ? require('../../Media/samplepic.jpg')
                            : cell.row.values.profile
                        }
                      />
                    </>
                  ) : cell.column.id === 'Type' ? (
                    <Text fontWeight={'bold'}>
                      {cell.row.values.Type}
                    </Text>
                  ) : cell.column.Header === 'ID' ? (
                    <Text fontWeight={'bold'} color={'blue.600'}>
                      {props.pageIndex === 0 ? ++i : (1 + i) * props.pageIndex}s
                    </Text>
                  ) : cell.column.id === 'status' ? (
                    <Text fontWeight={'bold'} color={'blue.600'}>
                      {cell.row.values.status === 1
                        ? 'ACTIVE'
                        : cell.row.values.status === 1
                        ? 'DISSABLED'
                        : 'PENDING'
                      }
                    </Text>
                  ) : (
                      cell.render('Cell')
                    )}
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </>
  );
};

export default TableRow;