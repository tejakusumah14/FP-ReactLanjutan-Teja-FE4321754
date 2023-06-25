import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Box,
  Image,
  FormControl,
  FormLabel,
  Select,
  Center,
  Flex,
} from "@chakra-ui/react";

const EditStudent = () => {
  const [fullname, setFullname] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [programStudy, setProgramStudy] = useState("");

  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect line 21");
    fetchData();
  }, [id]);

  async function fetchData() {
    const data = await fetch(`http://localhost:3001/student/${id}`);
    const dataJSON = await data.json();

    setLoading(false);
    setStudent(dataJSON);

    setFullname(dataJSON.fullname);
    setProfilePicture(dataJSON.profilePicture);
    setAddress(dataJSON.address);
    setPhoneNumber(dataJSON.phoneNumber);
    setBirthDate(dataJSON.birthDate);
    setGender(dataJSON.gender);
    setProgramStudy(dataJSON.programStudy);
  }

  const submitStudent = async (student) => {
    console.log(student);
    await fetch(`http://localhost:3001/student/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
  };

  console.log("Fullname now: ", fullname);
  // update state while form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("handleInputChange name: ", name);
    console.log("handleInputChange value: ", value);
    if (name === "fullname") {
      setFullname(value);
    } else if (name === "profilePicture") {
      setProfilePicture(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "birthDate") {
      setBirthDate(value);
    } else if (name === "gender") {
      setGender(value);
    } else if (name === "programStudy") {
      setProgramStudy(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStudent = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
      faculty: getFacultyByProgramStudy(programStudy),
    };
    console.log(newStudent);

    // console.log(newStudent);
    await submitStudent(newStudent);

    setFullname("");
    setBirthDate("");
    setGender("");
    setProgramStudy("");

    navigate("/student");
  };

  const getFacultyByProgramStudy = (programStudy) => {
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        return "Fakultas Ekonomi";
      case " Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        return "Fakultas Ilmu Sosial dan Politik";
      case "Teknik Sipil":
      case "Arsitektur":
        return "Fakultas Teknik";
      case "Matematika":
      case "Fisika":
      case "Informatika":
        return "Fakultas Teknologi Informasi dan Sains";
      default:
        return "";
    }
  };

  return (
    <>
      <NavBar />

      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <Center>
            <Box className="details">
              <Box w="400px">
                <form onSubmit={handleSubmit}>
                  <FormControl mb={4}>
                    <Center>
                      <FormLabel htmlFor="profilePicture">
                        Profile Picture:
                      </FormLabel>
                    </Center>
                    <Center>
                      <img
                        src={student.profilePicture}
                        alt={student.fullname}
                        type="text"
                        id="profilePicture"
                        name="profilePicture"
                        value={profilePicture}
                        data-testid="profilePicture"
                        htmlWidth="100%"
                        objectFit="cover"
                      />
                    </Center>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="fullname">Full Name:</FormLabel>
                    <Input
                      placeholder="Basic usage"
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={fullname}
                      onChange={handleInputChange}
                      data-testid="name"
                      mt={2}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel htmlFor="address">Address:</FormLabel>
                    <Input
                      placeholder="Basic usage"
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      onChange={handleInputChange}
                      data-testid="address"
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
                    <Input
                      placeholder="Basic usage"
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handleInputChange}
                      data-testid="phoneNumber"
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel htmlFor="birthDate">Birth Date:</FormLabel>
                    <Input
                      placeholder="Basic usage"
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={birthDate}
                      onChange={handleInputChange}
                      data-testid="date"
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel htmlFor="gender">Gender:</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={handleInputChange}
                      data-testid="gender"
                    >
                      <option value="">-- Select Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Select>
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel htmlFor="progamStudy">Program Study:</FormLabel>
                    <Select
                      id="programStudy"
                      name="programStudy"
                      value={programStudy}
                      onChange={handleInputChange}
                      data-testid="prody"
                    >
                      <option value="">-- Select Program Study --</option>
                      <option value="Ekonomi">Ekonomi</option>
                      <option value="Manajemen">Manajemen</option>
                      <option value="Akuntansi">Akuntansi</option>
                      <option value="Administrasi Publik">
                        Administrasi Publik
                      </option>
                      <option value="Administrasi Bisnis">
                        Administrasi Bisnis
                      </option>
                      <option value="Hubungan Internasional">
                        Hubungan Internasional
                      </option>
                      <option value="Teknik Sipil">Teknik Sipil</option>
                      <option value="Arsitektur">Arsitektur</option>
                      <option value="Matematika">Matematika</option>
                      <option value="Fisika">Fisika</option>
                      <option value="Informatika">Informatika</option>
                    </Select>
                  </FormControl>
                  <Flex justifyContent="flex-end" mt={4}>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      type="submit"
                      data-testid="edit-btn"
                    >
                      Edit student
                    </Button>
                  </Flex>
                </form>
              </Box>
            </Box>
          </Center>
        </>
      )}
      <Footer />
    </>
  );
};

export default EditStudent;
