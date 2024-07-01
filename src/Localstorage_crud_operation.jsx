import React, { useEffect, useState } from "react";

function Localstorege_Form() {
  const [myform, setMyForm] = useState(() => {
    const storedData = localStorage.getItem("Data");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [inputvalue, setInputValue] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };

  const handleData = (e) => {
    e.preventDefault();
    setMyForm([...myform, inputvalue]);
    setInputValue({ name: "", age: "", email: "", password: "" });
    console.log(myform);
    setEdit(null);
  };

  useEffect(() => {
    localStorage.setItem("Data", JSON.stringify(myform));
  }, [myform]);

  const handleDelete = (index) => {
    const updatedData = [...myform];
    updatedData.splice(index, 1);
    setMyForm(updatedData);
  };


  const handleEdit = (index) => {
    const originalIndex = sortedList.indexOf(filterList[index]);
    setEdit(originalIndex);
    setInputValue({
      name: filterList[index].name,
      password: filterList[index].password,
    })
  };

  const handleSaveData = () => {
    const updatedData = [...myform];
    updatedData[edit] = inputvalue;
    setMyForm(updatedData);
    setInputValue({ name: "", age: "", email: "", password: "" });
    setEdit(null);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const sortedList = sort ? [...myform].sort((a, b) => {
    const comparison = a[sort].localeCompare(b[sort]);
    return sortDirection === "asc" ? comparison : -comparison;
  }) : myform;

  const filterList = sortedList.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.password.toLowerCase().includes(search.toLowerCase())
    );
});

  const handleSort = (field) => {
    if (field === sort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }
    else {
      setSort(field);
      setSortDirection("asc");
    }

  }

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-3">
            <h2 className="mb-4">My Form </h2>

            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="name"
                  value={inputvalue.name}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter age"
                  name="age"
                  value={inputvalue.age}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address :
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  value={inputvalue.email}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password :
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter password"
                  name="password"
                  value={inputvalue.password}
                  onChange={handleInput}
                />
              </div>
              {edit === null ? (
                <button className="btn btn-primary" onClick={handleData}>
                  Submit
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleSaveData}>
                  Update
                </button>
              )}

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="form-control"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12">
            {myform.length > 0 ? (
              <table className="table table-hover table-bordered border-dark text-center">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#sr no</th>
                    <th scope="col">
                      Name <button onClick={() => { handleSort("name") }}>&uarr;</button>
                    </th>
                    <th scope="col">Age</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password
                      <button onClick={() => { handleSort("password") }} >&uarr;</button>
                    </th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filterList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>
                          <button
                            className="btn btn-primary me-3"
                            onClick={() => {
                              handleEdit(index);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Localstorege_Form;
