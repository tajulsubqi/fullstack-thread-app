import { Box, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type/RootState';
import { SuggestedCard } from '../../components/SuggestedFollow';
// import useFollow from './hook/useFollow';

export default function FollowCard() {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Box h={'screen'}  w={{ base: '130%', md: '100%' }} ml={{ base: -5, md: 0 }}>
      <Box>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em" color={'white'}>
            <Tab>Following</Tab>
            <Tab>Followers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel w={{ base: '100%', md: '50%'}} color={'white'}>
              {auth.following?.map((item) => (
                <SuggestedCard key={item.id} id={item.id} full_name={item.full_name} username={item.username} />
              ))}
            </TabPanel>
            <TabPanel w={{ base: '100%', md: '50%' }} ml={'auto'} color={"white"}>
              {auth.followers?.map((item) => (
                <SuggestedCard key={item.id} id={item.id} full_name={item.full_name} username={item.username} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
