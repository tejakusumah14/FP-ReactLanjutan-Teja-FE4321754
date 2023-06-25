import { Link } from "react-router-dom";
import { Button, Heading, Flex, Center, Box, Spacer } from "@chakra-ui/react";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.100">
      <Box p={8} bg="white" rounded="md" shadow="md">
        <Center>
          <Heading as="h1" size="2xl" mb={10} color="teal.500">
            Welcome to Website <br />
            <Center> Student Portal</Center>
          </Heading>
        </Center>
        <Center>
          <Button colorScheme="teal" variant="solid" mb={10} size="sm">
            <Link data-testid="student-btn" to="/student">
              All Students
            </Link>
          </Button>
        </Center>
        <Spacer />
        <Center>
          <Footer />
        </Center>
      </Box>
    </Flex>
  );
};

export default Home;
