import React from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { addSubCategory, deleteSubCategory, editSubCategory, getSubCategory } from "../../../redux/slice/subcategory.slice";

function Subcategory() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [update, setUpdate] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const subCategories = useSelector((state) => state.subCategories);
  console.log(subCategories);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setUpdate(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.currentTarget.files[0]);
  };

  // const getData = async () => {

  //   dispatch(getSubCategory())

  // };

  const getData = async () => {
    dispatch(getSubCategory());
  };

  const getCategory = async () => {

    const response = await fetch(
      "http://localhost:5000/api/v1/categories/"
    );
    const data = await response.json();
    setCategoryData(data.data);
  };

  React.useEffect(() => {
    getData();
    getCategory();
  }, []);

  const handleDelete = async (_id) => {
    dispatch(deleteSubCategory(_id))
  };

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(data);
  };

  const columns = [
    {
      field: "categoryName", headerName: "Category", width: 150, valueGetter: (params) => {
        const categoryName = categoryData.find((v) => v._id === params.row.category_id)
        return categoryName ? categoryName.name : '';
      }
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: 'img', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value.url} width={50} /> },
    {
      field: "Action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  let subcategorySchema = object({
    category_id: string().required("Please select a category"),
    name: string().required("Please enter a name"),
    description: string()
      .required("Please enter a description")
      .min(5, "Please enter at least 5 characters"),
    img: Yup.mixed().test('size', 'Upload file valid only 2 MB', (value) => value && value.size <= 2 * 1024 * 1024).test('type', 'Upload file valid only jpeg, png, svg', (value) => value && ['image/jpeg', 'image/png, image/svg'].includes(value.type)).required('Please upload image')
  });

  const formik = useFormik({
    initialValues: {
      category_id: "",
      name: "",
      description: "",
      img: "",
    },
    validationSchema: subcategorySchema,
    onSubmit: (values, { resetForm }) => {

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('category_id', values.category_id);

      if (selectedFile) {
        formData.append('img', selectedFile);
      }

      if (update) {
        // console.log(values);
        // handleUpdateData(update._id, formData);
        dispatch(editSubCategory(update._id, formData))
      } else {
        dispatch(addSubCategory(formData));
      }

      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values, setFieldValue } = formik;

  const changeSelect = (event) => {
    setFieldValue("category_id", event.target.value);
  };

  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Subcategory
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subcategory</DialogTitle>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <DialogContent>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">
                    SubCategory
                  </InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category_id"
                    value={values.category_id}
                    label="Category"
                    name="category_id"
                    onChange={changeSelect}
                    onBlur={handleBlur}
                    error={errors.category_id && touched.category_id ? true : false}
                    helperText={errors.category_id && touched.category_id ? errors.category_id : ""}
                  >
                    {categoryData.map(
                      (v) => ((
                        <MenuItem key={v._id} value={v._id}>
                          {v.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Subcategory Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name ? true : false}
                helperText={errors.name && touched.name ? errors.name : ""}
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Subcategory Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={errors.description && touched.description ? true : false}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
              />
              <input
                type="file"
                name="img"
                onChange={(event) => handleFileChange(event)}
                onBlur={handleBlur}
              />
              {errors.img && touched.img && <div className="text-danger">{errors.img}</div>}

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{update ? "Update" : "Add"}</Button>
              </DialogActions>
            </DialogContent>
          </form>
        </Dialog>
      </React.Fragment>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={subCategories.subcategory.map(category => ({ ...category, id: category._id }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  );
}

export default Subcategory;
