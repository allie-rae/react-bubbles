import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setIsFetching, isFetching }) => {
  console.log("colors", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    code: {
      hex: ''
    }
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  console.log("colorToEdit", colorToEdit)

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
    setIsFetching(!isFetching)
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
    setEditing(false)
    setIsFetching(!isFetching)
  };

  const handleColorChange = (e) => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value })
  }

  const handleCodeChange = (e) => {
    setNewColor({ ...newColor, code: { ...newColor.code, hex: e.target.value } })
  }

  const addSubmit = (e) => {
    e.preventDefault();
    console.log("newColor", newColor)
    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => {
        console.log("newcolorsform res.data", res.data);
        updateColors(res.data)
        setNewColor({
          color: '',
          code: {
            hex: ''
          }
        })
      })
      .catch(err => console.log("hello from the error place", err))
    setIsFetching(!isFetching)
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form>
        <input
          name="color"
          placeholder="Color"
          value={newColor.color}
          onChange={handleColorChange}
          className="colorInput"
        />
        <input
          name="hex"
          placeholder="Hex Code"
          value={newColor.code.hex}
          onChange={handleCodeChange}
          className="colorInput"
        />
        <button onClick={addSubmit} type="button" className="colorInput">Add Color</button>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

    </div>
  );
};

export default ColorList;
