import { Box, Center } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Box className="footer" fontSize={14} mt="10" fontFamily="monospace">
        <Center>
          <p className="studentName">Teja Kusumah</p>
        </Center>
        <Center>
          <p className="studentId">FE4321754</p>
        </Center>
      </Box>
    </>
  );
};

export default Footer;
