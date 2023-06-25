import { Link as ReactLink } from "react-router-dom";
import {
  Link,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Center,
} from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box bg="teal.500" py={4} px={8} color="white">
      <Center>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          <Link as={ReactLink} to="/" data-testid="home-page">
            Student Portal
          </Link>
        </Text>
      </Center>
      <Center>
        <UnorderedList display="flex" listStyleType="none" p={0} m={0}>
          <ListItem mx={2}>
            <Link as={ReactLink} to="/student" data-testid="student-page">
              All Students
            </Link>
          </ListItem>
          <ListItem mx={2}>
            <Link as={ReactLink} to="/add" data-testid="add-page">
              Add Student
            </Link>
          </ListItem>
        </UnorderedList>
      </Center>
    </Box>
  );
};

export default NavBar;
