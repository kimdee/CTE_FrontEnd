import { useState } from 'react'
import {
  Box,
  Select,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Center,
  Flex,
  Text,
  Heading
} from '@chakra-ui/react'
import axios from 'axios'

export default function AddSchedule() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [class_name, setClass_Name] = useState()
  const [day, setDay] = useState()
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()

  function addSchedule() {
    axios.post('http://api.ctewmsufaculty.xyz/api/schedules/store',
      {
          "schedule_class_name": class_name,
          "schedule_day": day,
          "schedule_start_time": startTime,
          "schedule_end_time": endTime,
      })

    onClose()
  }

  return (
    <Box>
      <Button w={['80vw', '75vw', '700px']} onClick={onOpen} colorScheme='blueCTE' >Add Schedule</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='gray.700'>Add Schedule</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl >
                <FormLabel htmlFor='className'>Class Name</FormLabel>
                <Input id='className' onChange={(e) => setClass_Name(e.target.value)} />
              </FormControl>

              <Text>Day </Text>
              <Center pb={5}>
                <CheckboxGroup colorScheme='blue' onChange={(e) => setDay(e.target.value)}> {/* // recheck value */}
                  <Stack spacing={[3, 5]} direction={'row'}>
                    <Checkbox value='mon'>Mon</Checkbox>
                    <Checkbox value='tue'>Tue</Checkbox>
                    <Checkbox value='wed'>Wed</Checkbox>
                    <Checkbox value='thu'>Thu</Checkbox>
                    <Checkbox value='fri'>Fri</Checkbox>
                    <Checkbox value='sat'>Sat</Checkbox>
                    <Checkbox value='sun'>Sun</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Center>

              <Flex direction='row'>
                <FormControl mb={5} isRequired>
                  <FormLabel htmlFor='fromTime'>Start Time</FormLabel>
                  <Select id='fromTime' onChange={(e) => setStartTime(e.target.value)}>
                    <option value="7:00AM">7:00AM</option>
                    <option value="7:30AM">7:30AM</option>
                    <option value="8:00AM">8:00AM</option>
                    <option value="8:30AM">8:30AM</option>
                    <option value="9:00AM">9:00AM</option>
                    <option value="9:30AM">9:30AM</option>
                    <option value="10:00AM">10:00AM</option>
                    <option value="10:30AM">10:30AM</option>
                    <option value="11:00AM">11:00AM</option>
                    <option value="11:30AM">11:30AM</option>
                    <option value="12:00PM">12:00PM</option>
                    <option value="12:30PM">12:30PM</option>
                    <option value="1:00PM">1:00PM</option>
                    <option value="1:30PM">1:30PM</option>
                    <option value="2:00PM">2:00PM</option>
                    <option value="2:30PM">2:30PM</option>
                    <option value="3:00PM">3:00PM</option>
                    <option value="3:30PM">3:30PM</option>
                    <option value="4:00PM">4:00PM</option>
                    <option value="4:30PM">4:30PM</option>
                    <option value="5:00PM">5:00PM</option>
                    <option value="5:30PM">5:30PM</option>
                    <option value="6:00PM">6:00PM</option>
                    <option value="6:30PM">6:30PM</option>
                    <option value="7:00PM">7:00PM</option>
                    <option value="7:30PM">7:30PM</option>
                    <option value="8:00PM">8:00PM</option>
                    <option value="8:30PM">8:30PM</option>
                    <option value="9:00PM">9:00PM</option>
                  </Select>
                </FormControl>
                <Text m={5}>to</Text>
                <FormControl mb={5} isRequired>
                  <FormLabel htmlFor='toTime'>End Time</FormLabel>
                  <Select id='toTime' onChange={(e) => setEndTime(e.target.value)}>
                    <option value="7:00AM">7:00AM</option>
                    <option value="7:30AM">7:30AM</option>
                    <option value="8:00AM">8:00AM</option>
                    <option value="8:30AM">8:30AM</option>
                    <option value="9:00AM">9:00AM</option>
                    <option value="9:30AM">9:30AM</option>
                    <option value="10:00AM">10:00AM</option>
                    <option value="10:30AM">10:30AM</option>
                    <option value="11:00AM">11:00AM</option>
                    <option value="11:30AM">11:30AM</option>
                    <option value="12:00PM">12:00PM</option>
                    <option value="12:30PM">12:30PM</option>
                    <option value="1:00PM">1:00PM</option>
                    <option value="1:30PM">1:30PM</option>
                    <option value="2:00PM">2:00PM</option>
                    <option value="2:30PM">2:30PM</option>
                    <option value="3:00PM">3:00PM</option>
                    <option value="3:30PM">3:30PM</option>
                    <option value="4:00PM">4:00PM</option>
                    <option value="4:30PM">4:30PM</option>
                    <option value="5:00PM">5:00PM</option>
                    <option value="5:30PM">5:30PM</option>
                    <option value="6:00PM">6:00PM</option>
                    <option value="6:30PM">6:30PM</option>
                    <option value="7:00PM">7:00PM</option>
                    <option value="7:30PM">7:30PM</option>
                    <option value="8:00PM">8:00PM</option>
                    <option value="8:30PM">8:30PM</option>
                    <option value="9:00PM">9:00PM</option>
                  </Select>
                </FormControl>
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={2} onClick={onClose}>Discard</Button>
            <Button colorScheme='blue' onClick={() => addSchedule()}>Add Schedule</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )

}

/* function timeOption() {
  let hour = 7;
  let min = 0;
  let hourFormat = 'AM'
  let time;

  for (let i = 0; i < 29; i++) {
    if (min === 0) {
      time = hour + ':' + '00' + hourFormat;
    } else {
      time = hour + ':' + min + hourFormat;
    }

    min += 30
    if (min === 60) {
      hour = hour + 1;
      min = 0;
      if (hour === 13) {
        hour = 1;
      }
      if (hour === 12) {
        hourFormat = 'PM'
      }
    }
    console.log(time);
    <option value={time}>{time}</option>
  }
} */