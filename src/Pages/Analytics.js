import {
    Box,
    Heading,
    Text,
    Spacer,
    Center,
    Stack
  } from '@chakra-ui/react'
  
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  } from 'chart.js'
  
  import { Doughnut, Bar } from 'react-chartjs-2'
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)
  
  export default function Analytics() {
    return (
      <Box>
        <Heading size='lg' mb={5}>Analytics</Heading>
        <Center flexDirection='column' alignItems='stretch'>
          <Center flexDirection={['column','row']} alignItems='stretch' alignContent='stretch' justifyContent='space-around'>
           {/*  <Stack mb={5}>
              <NumberCard cardName='Current Available Faculty' data='5' />
              <Spacer />
              <NumberCard cardName='On Class' data='12' />
              <Spacer />
              <NumberCard cardName='On Study Leave' data='12' />
            </Stack> */}
  
            <EducationalBGCard />
            <DepartmentCard />
          </Center>
          <Box p={[0, 8]}>
            <FacultyYearsInService />
  
          </Box>
  
        </Center>
      </Box >
    )
  }
  
  function DepartmentCard() {
    const data = {
      labels: ['Secondary Education', 'Elementary Education', 'Special Education'],
      datasets: [
        {
          label: '# of Votes',
          data: [23, 27, 16],
          backgroundColor: [
            '#110A61',
            '#FABC4B',
            '#1C62BA',
          ],
        },
      ],
    };
  
    return (
      <Box bgColor='gray.50' p={5} borderRadius={25} mb={5} boxShadow='md' >
        <Heading size='xs' mb={2}>
          Faculty per Department Count
        </Heading>
        <Doughnut data={data} />
        <Box color='gray.500' mt={2}>
          <Text fontSize='sm'>Secondary Education: 23</Text>
          <Text fontSize='sm'>Elementary Education: 27</Text>
          <Text fontSize='sm'>Special Education: 16</Text>
        </Box>
      </Box>
    )
  }
  
  function EducationalBGCard() {
    const data = {
      labels: ['Bachelors', 'Master', 'Doctor'],
      datasets: [
        {
          data: [12, 19, 3],
          backgroundColor: [
            '#110A61',
            '#FABC4B',
            '#1C62BA',
          ],
        },
      ],
    };
  
    return (
      <Box bgColor='gray.50' p={5} borderRadius={25} mb={5} boxShadow='md' >
        <Heading size='xs' mb={2}>
          Faculty Education Background
        </Heading>
        <Doughnut data={data} />
        <Box color='gray.500' mt={2}>
          <Text fontSize='sm'>Bachelor's Degree Holder: 12</Text>
          <Text fontSize='sm'>Master's Degree Holder: 19</Text>
          <Text fontSize='sm'>Doctorate's Degree Holder: 3</Text>
        </Box>
      </Box>
    )
  }
  
  function FacultyYearsInService() {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  
    const data = {
      labels: ['0-5 Years', '6-15 Years', '16-25 Years', '26-50 Years'],
      datasets: [
        {
          label: 'Elementary Education',
          data: [12, 19, 3, 2],
          backgroundColor: '#110A61',
        },
        {
          label: 'Secondary Education',
          data: [2, 9, 11, 5],
          backgroundColor: '#FABC4B',
        },
        {
          label: 'Special Education',
          data: [5, 13, 4, 1],
          backgroundColor: '#1C62BA',
        }
      ],
    };
  
    return (
      <Box bgColor='gray.50' p={5} borderRadius={25} boxShadow='md' >
        <Heading size='xs' mb={2}>
          Faculty Years in Service
        </Heading>
        <Bar options={options} data={data} />
        {/* <Doughnut data={data} /> */}
        <Box color='gray.500' mt={2}>
          <Text fontSize='sm'>0-5 Years: 12</Text>
          <Text fontSize='sm'>5-15 Years: 19</Text>
          <Text fontSize='sm'>15-25 Years: 3</Text>
          <Text fontSize='sm'>25-50 Years: 2</Text>
        </Box>
      </Box>
    )
  }
  
  function NumberCard({ cardName, data }) {
    return (
      <Box bgColor='gray.50' p={5} borderRadius={25} w='175px' boxShadow='md' >
        <Heading size='xs' mb={2}>
          {cardName}
        </Heading>
        <Heading color='gray.500'>{data}</Heading>
      </Box>
    )
  }