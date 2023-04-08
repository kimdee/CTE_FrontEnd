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
  import { PutRequest } from '../../api/api';
  import { User } from '../../api/Path';
  import { BiReset } from 'react-icons/bi';
  import { MdOutlineMessage } from 'react-icons/md';
  import { CustomViewButton } from '../../dashboard/Component/CustomViewModal';
  import { CustomEditButton } from '../Component/ActionModal';
  // , CustomDeleteButton
  import useAuth from '../../Hooks/AuthContext';
  
  const Actions = ({
    title,
    fetch,
    rawData,
    SpecializationData,
    hospitalData,
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
        {title === 'Super Admin' && user.user_role ==='Super Admin' ? (
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
        
      {title === 'User' ? (
        <CustomEditButton
          title={title}
          data={cellvalue}
          fetch={fetch}
          rawData={props.data}
          row={row}
        />
      ) : null}
  
        {/* {title !== 'User' ? (
          <CustomDeleteButton fetch={fetch} title={title} id={[cellvalue]} />
        ) : null} */}
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
                  <Td textAlign={"center"} {...cell.getCellProps()}>
                    {cell.column.id === 'action' ? (
                      <Flex columnGap={3}>
                        {props.title === 'User' ? (
                          <CustomViewButton
                            title={props.title}
                            data={props.data}
                            id={[cell.row.values]}
                          />
                        ) : (
                          ''
                        )}

                        {props.title !== 'Case' ? (
                        user.user_role === 'Super Admin' ||
                        user.user_role === 'Admin' ? (
                          <>
                            <Actions
                              title={props.title}
                              cellvalue={cell.row.values}
                              fetch={props.fetch}
                              rawData={props.data}
                              SpecializationData={props.SpecializationData}
                              hospitalData={props.hospitalData}
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
                              SpecializationData={props.SpecializationData}
                              hospitalData={props.hospitalData}
                              row={row.values}
                              props={props}
                              user={user}
                            />
                          </>
                        )
                      ) : (
                        ''
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
                              ? require('../../media/samplepic.jpg')
                              : cell.row.values.profile
                          }
                        />
                      </>
                    ) : cell.column.Header === 'ID' ? (
                      <Text fontWeight={'bold'} color={'green.600'}>
                        {props.pageIndex === 0 ? ++i : (1 + i) * props.pageIndex}s
                      </Text>
                    ) 
                    // : cell.column.id === 'status' ? (
                    //   <Text fontWeight={'bold'} color={'green.600'}>
                    //     {cell.row.values.status === 1
                    //       ? 'ACTIVE'
                    //       : cell.row.values.status === 2
                    //       ? 'DISSABLED'
                    //       : 'PENDING'}
                    //   </Text>
                    // )
                     : (
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