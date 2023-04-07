import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Axios from "axios";

function BootstrapTable() {
  const [rows, setRows] = useState([
    {
      id: 1,
      date: new Date(),
      shipper: "",
      item: "",
      CNTR: "",
      mode: "",
      pol: "",
      dest: "",
      buying: "",
      selling: "",
      profit: "",
      status: ""
    }
  ]);

  useEffect(() => {
    Axios.get(`http://localhost:3000/ship`)
      .then((response) => setRows(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    setRows([
      ...rows,
      {
        id: newId,
        date: new Date(),
        shipper: "",
        item: "",
        CNTR: "",
        mode: "",
        pol: "",
        dest: "",
        buying: "",
        selling: "",
        profit: "",
        status: ""
      }
    ]);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleChange = (event, id) => {
    const { name, value } = event.target;
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          [name]: value
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleDateChange = (date, id) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          date
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const saveData = () => {
    Axios.post(`http://localhost:3000/ship`, rows)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    console.log(rows);
  };

  const renderRows = () =>
    rows.map((row) => (
      <tr key={row.id}>
        <td>
          <Form.Check type="checkbox" />
        </td>
        <td>
          <DatePicker
            selected={row.date}
            onChange={(date) => handleDateChange(date, row.id)}
            dateFormat="MM-dd-yyyy"
          />
        </td>
        <td>
          <Form.Control
            type="text"
            name="shipper"
            value={row.shipper}
            onChange={(event) => handleChange(event, row.id)}
          />
        </td>
        <td>
          <Form.Control
            type="text"
            name="item"
            value={row.item}
            onChange={(event) => handleChange(event, row.id)}
          />
        </td>
        <td>
          <Form.Control
            as="select"
            name="CNTR"
            value={row.CNTR}
            onChange={(event) => handleChange(event, row.id)}
          >
            <option value="20'">20'</option>
            <option value="40HC">40HC</option>
          </Form.Control>
        </td>
        <td>
          <Form.Control
            as="select"
            name="mode"
            value={row.mode}
            onChange={(event) => handleChange(event, row.id)}
          >
            <option value="air">TCR</option>
            <option value="sea">TSR</option>
            <option value="road">Truck</option>
          </Form.Control>
        </td>
        <td>
          <Form.Control
            as="select"
            name="pol"
            value={row.pol}
            onChange={(event) => handleChange(event, row.id)}
          >
            <option value="Busan">Busan</option>
            <option value="Incheon">Incheon</option>
            <option value="PyeongTaek">PyeongTaek</option>
          </Form.Control>
        </td>
        <td>
          <Form.Control
            as="select"
            name="dest"
            value={row.dest}
            onChange={(event) => handleChange(event, row.id)}
          >
            <option value="Tashkent">Tashkent</option>
            <option value="Namangan">Namangan</option>
            <option value="Fergana">Fergana</option>
            <option value="Andizhan">Andizhan</option>
          </Form.Control>
        </td>
        <td>
          <Form.Control
            type="text"
            name="buying"
            value={row.buying}
            onChange={(event) => handleChange(event, row.id)}
          />
        </td>
        <td>
          <Form.Control
            type="text"
            name="selling"
            value={row.selling}
            onChange={(event) => handleChange(event, row.id)}
          />
        </td>
        <td>
          <Form.Control
            type="text"
            name="profit"
            value={
              row.selling && row.buying ? `$${row.selling - row.buying}` : ""
            }
            onChange={(event) => handleChange(event, row.id)}
          />
        </td>
        <td>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDeleteRow(row.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

  return (
    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
        Uzbekistan Shipment Inquiry
      </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Inquiry Date</th>
            <th>Shipper</th>
            <th>Item</th>
            <th>CNTR</th>
            <th>Mode</th>
            <th>POL</th>
            <th>Dest</th>
            <th>Buying</th>
            <th>Selling</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
          <tr>
            <td colSpan="12">
              <Button variant="success" size="sm" onClick={handleAddRow}>
                Add Row
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Button variant="primary" size="sm" onClick={saveData}>
        Save
      </Button>
    </div>
  );
}

export default BootstrapTable;
