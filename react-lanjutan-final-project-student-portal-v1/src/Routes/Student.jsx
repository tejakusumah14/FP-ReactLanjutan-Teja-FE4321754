import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);
  console.log("Student List: ", students);

  async function fetchData() {
    const data = await fetch("http://localhost:3001/student");
    const dataJSON = await data.json();

    setLoading(false);
    setStudents(dataJSON);
    setFilteredStudents(dataJSON);
  }

  const handleFilterChange = (e) => {
    const faculty = e.target.value;
    setSelectedFaculty(faculty);

    if (faculty === "All") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) => student.faculty === faculty
      );
      setFilteredStudents(filtered);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/student/${id}`, {
      method: "DELETE",
    });
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <Select
            placeholder="Filter by Faculty"
            value={selectedFaculty}
            onChange={handleFilterChange}
            data-testid="filter"
            mb={4}
          >
            <option value="All">All</option>
            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
            <option value="Fakultas Ilmu Sosial dan Politik">
              Fakultas Ilmu Sosial dan Politik
            </option>
            <option value="Fakultas Teknik">Fakultas Teknik</option>
            <option value="Fakultas Teknologi Informasi dan Sains">
              Fakultas Teknologi Informasi dan Sains
            </option>
          </Select>
          <Table
            variant="striped"
            colorScheme="gray"
            size="sm"
            className="test-table-container test-table"
            id="table-student"
          >
            <Thead>
              <Th>No</Th>
              <Th>Full Name</Th>
              <Th>Faculty</Th>
              <Th>Program Study</Th>
              <Th>Option</Th>
            </Thead>
            <Tbody>
              {filteredStudents.map((student, index) => {
                return (
                  <Tr className="student-data-row test-tr" key={student.id}>
                    <Td className="test-td">{index + 1}</Td>
                    <Td>
                      <Link to={`/student/${student.id}`}>
                        {student.fullname}
                      </Link>
                    </Td>
                    <Td>{student.faculty}</Td>
                    <Td>{student.programStudy}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        size="xs"
                        variant="solid"
                        onClick={() => handleDelete(student.id)}
                        data-testid={`delete-${student.id}`}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Student;
