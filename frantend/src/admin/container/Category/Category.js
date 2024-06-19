import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addCategory, deleteCategory, editCategory, getCategory } from "../../../redux/action/category.action";
import { Link } from "react-router-dom";

function Category() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);

    const dispatch = useDispatch();

    const categories = useSelector((state) => state.category.category);
    console.log(categories);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    const handleFileChange = (event) => {
        setFieldValue("img", event.currentTarget.files[0]);
    };

    const categorySchema = Yup.object({
        img: Yup.mixed()
            // .required('Please upload image')
            .test('size', 'Upload file valid only 2 MB',
                (value) => {
                    if (value?.size) {
                        return value?.size <= 2 * 1024 * 1024
                    }
                    return true
                })
            .test('type', 'Upload file valid only jpeg, png, svg',
                (value) => {
                    if (value?.type) {
                        return value && ['image/jpeg', 'image/png, image/svg'].includes(value?.type)
                    }
                    return true
                }),
        name: Yup.string().required('Please enter name'),
        description: Yup.string().required('Please enter description').min(5, 'Please enter minimum 5 characters'),
    });

    const formik = useFormik({
        initialValues: {
            img: '',
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: async (values, { resetForm }) => {
            // const formData = new FormData();
            // formData.append('name', values.name);
            // formData.append('description', values.description);

            // if (selectedFile) {
            //     formData.append('img', selectedFile);
            // }

            if (update) {
                dispatch(editCategory(values));
            } else {
                dispatch(addCategory(values));
            }

            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setFieldValue } = formik;

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(data._id);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 700 },
        { field: 'img', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value.url} width={50} /> },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    console.log(values);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Category</DialogTitle>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Category Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />

                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Category Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && touched.description}
                            helperText={errors.description && touched.description ? errors.description : ''}
                        />
                        <input
                            type="file"
                            name="img"
                            onChange={(event) => handleFileChange(event)}
                            onBlur={handleBlur}
                        />
                        {values.img && <img src={values.img.url ? values.img.url : URL.createObjectURL(values.img)} width={50} />}
                        {errors.img && touched.img && <div className="text-danger">{errors.img}</div>}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                    </DialogActions>
                </form>

            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={categories}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </div>
    );

}

export default Category;
