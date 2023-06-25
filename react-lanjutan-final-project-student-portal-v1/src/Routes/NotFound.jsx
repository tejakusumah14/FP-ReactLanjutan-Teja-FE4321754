import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>404 Not Found</h1>
      <Button colorScheme="teal" variant="solid" onClick={() => navigate("/")}>
        Back to home
      </Button>
    </>
  );
};

export default NotFound;
