"use client";

import { useEffect, useState } from "react";

interface Employee {
  id: string | null;
  firstName: string;
  lastName: string;
  email: string;
  document: string;
  phones: string[];
  birthDate: string;
}

const EmployeeCrud = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "01FA5809-EA92-48C8-BF49-B56686A1E0E9",
    firstName: "",
    lastName: "",
    email: "",
    document: "",
    phones: [""],
    birthDate: "",
  });
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [phones, setPhones] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Carregar os funcionários do backend
    fetchEmployees();

    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const addPhone = () => {
    setPhones([...phones, ""]);
  };

  const removePhone = (index: number) => {
    const updatedPhones = phones.filter((_, i) => i !== index);
    setPhones(updatedPhones);
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedPhones = [...phones];
    updatedPhones[index] = e.target.value;
    setPhones(updatedPhones);
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employee");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      setError("Failed to load employees");
      console.error(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      newEmployee.phones = phones;
      const response = await fetch("http://localhost:5000/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      fetchEmployees();
      setNewEmployee({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        document: "",
        phones: [""],
        birthDate: "",
      });
    } catch (error) {
      setError("Failed to create employee");
      console.error(error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditEmployee(employee);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmployee) return;
    try {
      editEmployee.phones = phones;
      const response = await fetch(`http://localhost:5000/api/employee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editEmployee),
      });
      if (!response.ok) {
        throw new Error("Failed to update employee");
      }
      fetchEmployees();
      setEditEmployee(null);
    } catch (error) {
      setError("Failed to update employee");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employee?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
      fetchEmployees();
    } catch (error) {
      setError("Failed to delete employee");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Employee CRUD</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Formulário de criação ou edição */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editEmployee ? "Edit Employee" : "Create Employee"}
        </h2>
        <form
          onSubmit={editEmployee ? handleUpdate : handleCreate}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={
                editEmployee ? editEmployee.firstName : newEmployee.firstName
              }
              onChange={(e) =>
                editEmployee
                  ? setEditEmployee({
                      ...editEmployee,
                      firstName: e.target.value,
                    })
                  : setNewEmployee({
                      ...newEmployee,
                      firstName: e.target.value,
                    })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={
                editEmployee ? editEmployee.lastName : newEmployee.lastName
              }
              onChange={(e) =>
                editEmployee
                  ? setEditEmployee({
                      ...editEmployee,
                      lastName: e.target.value,
                    })
                  : setNewEmployee({ ...newEmployee, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={editEmployee ? editEmployee.email : newEmployee.email}
              onChange={(e) =>
                editEmployee
                  ? setEditEmployee({ ...editEmployee, email: e.target.value })
                  : setNewEmployee({ ...newEmployee, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Document
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={
                editEmployee ? editEmployee.document : newEmployee.document
              }
              onChange={(e) =>
                editEmployee
                  ? setEditEmployee({
                      ...editEmployee,
                      document: e.target.value,
                    })
                  : setNewEmployee({ ...newEmployee, document: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phones
            </label>
            {phones.map((phone, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e, index)} // Atualiza o número do telefone
                  placeholder="Phone number"
                />
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => removePhone(index)} // Remove o número de telefone
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={addPhone} // Adiciona um novo campo de telefone
            >
              Add Phone
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Birth Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={
                editEmployee ? editEmployee.birthDate : newEmployee.birthDate
              }
              onChange={(e) =>
                editEmployee
                  ? setEditEmployee({
                      ...editEmployee,
                      birthDate: e.target.value,
                    })
                  : setNewEmployee({
                      ...newEmployee,
                      birthDate: e.target.value,
                    })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            {editEmployee ? "Update Employee" : "Create Employee"}
          </button>
        </form>
      </div>

      {/* Lista de Funcionários */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-left text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="px-4 py-2">{employee.id}</td>
                  <td className="px-4 py-2">{employee.firstName}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-800"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => employee.id && handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeCrud;
