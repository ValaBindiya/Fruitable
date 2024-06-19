import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, deleteProduct, editProduct, getProducts } from '../../../redux/action/products.action';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Spinner } from 'reactstrap';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';
import { BASE_URL } from '../../../utils/baseURL';
import { getSubCategory } from '../../../redux/slice/subcategory.slice';
import { addProduct, deleteProduct, editProduct, getProducts } from '../../../redux/action/products.action';

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    // const [category_id , setCategory_id] = useState([])
    const [subcategoryData, setSubcategoryData] = useState([]);
    // const [products, setProducts] = useState([]);
    console.log(subcategoryData);

    const subcategoriesData = useSelector(state => state.subCategories)
    console.log(subcategoriesData.subcategory);

    const productsdata = useSelector(state => state.products.products)
    console.log(productsdata);

    const dispatch = useDispatch()

    useEffect(() => {
        getCategory()
        // getsubcategorydata()
        // getproducts()
        // dispatch(getProducts())
        dispatch(getProducts())
        dispatch(getSubCategory())
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let productSchema = object({
        category_id: string().required("Please select a category"),
        subCategory_id: string().required("Please select a category"),
        name: string().required(),
        // price: number().required(),
        description: string().required().min(10, "Please enter 10 charecter long messege."),
    });

    const formik = useFormik({
        initialValues: {
            category_id: "",
            subCategory_id: "",
            name: '',
            // price: '',
            description: '',
        },

        validationSchema: productSchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editProduct(values))
                // handleupdate(values)
            } else {
                dispatch(addProduct(values))
                // handleadd(values)
                // console.log(values);
            }

            resetForm()
            handleClose(true)
        },
    });

    const { handleSubmit, handleChange, handleBlur, touched, errors, values, setFieldValue } = formik

    const handleDelete = async (_id) => {
        dispatch(deleteProduct(_id))
        // dispatch(deleteProduct(id))
        // console.log(_id);

        // try {
        //     const response = await axios.delete(BASE_URL + 'products/delete-product/' + _id)
        //     // console.log(response.data);
        //     // console.log(response.data.data);
        // } catch (error) {
        //     console.log(error);
        // }

        // getproductsdata()
    }

    // const handleadd = async (data) => {
    //     console.log(data);
    //     try {
    //         const response = await axios.post(BASE_URL + 'products/add-product', data)
    //         console.log(response.data.data);
    //     } catch (error) {

    //     }

    //     getproductsdata()
    // }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true)
        formik.setFieldValue("subCategory_id", data.subCategory_id);

    }

    const handleupdate = async (data) => {

        // dispatch(editProduct(data))
        // console.log(data);

        // try {
        //     await axios.put(BASE_URL + 'products/update-product/' + data._id, data)

        // } catch (error) {
        //     console.log(error);
        // }

        // getproductsdata()
    }

    const columns = [
        {
            field: "categoryName", headerName: "Category", width: 150,
            valueGetter: (params) => {
                const categoryName = categoryData?.find((v) => v._id === params.row.category_id)
                return categoryName ? categoryName.name : ''
            }
        },
        {
            field: "subCategory_id", headerName: "Subcategory", width: 150,
            valueGetter: (params) => {
                console.log(params.row);
                const subcategoryName = subcategoriesData.subcategory.find((v) => v._id === params.row.subCategory_id)
                console.log(subcategoryName);

                return subcategoryName ? subcategoryName.name : ''
            }

        },
        { field: 'name', headerName: 'Product name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => (handleEdit(params.row))}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => (handleDelete(params.row._id))}>
                        <DeleteIcon />
                    </IconButton>

                </>
            ),

        }
    ];

    const changeSelect = (event) => {
        setFieldValue("category_id", event.target.value);
        getsubcategorydata(event.target.value)
        setFieldValue("subCategory_id", "")

            // const categoryId = event.target.value;
            // setFieldValue("category_id", categoryId);
            ; // Reset the subcategory field
        // getsubcategory(categoryId);
    };

    // const getproductsdata = async () => {
    //     dispatch(getProducts())

    //     // const response = await fetch('http://localhost:5000/api/v1/products/list-product');
    //     // const data = await response.json();
    //     // setProducts(data.data)
    //     // console.log(data);
    // }

    const getsubcategorydata = async (category_id) => {
        const response = await fetch(`http://localhost:5000/api/v1/subcategories/list-subcategory-by-category/${category_id}`);
        const data = await response.json();
        setSubcategoryData(data.data)
    }

    const getCategory = async () => {
        const response = await fetch(
            "http://localhost:5000/api/v1/categories"
        );
        const data = await response.json();
        setCategoryData(data.data);
    };

    return (

        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Food</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="category-select-label">
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category_id"
                                    value={values.category_id}
                                    label="Category"
                                    name="category_id"
                                    onChange={changeSelect}
                                    onBlur={handleBlur}
                                    error={
                                        errors.category_id && touched.category_id ? true : false
                                    }
                                >
                                    {categoryData?.length > 0 && categoryData && categoryData?.map(
                                        (v) => (
                                            (
                                                <MenuItem key={v?._id} value={v?._id}>
                                                    {v?.name}
                                                </MenuItem>
                                            )
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="category-select-label">
                                    SubCategory
                                </InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="subCategory_id"
                                    value={values.subCategory_id}
                                    label="Category"
                                    name="subCategory_id"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.subCategory_id && touched.subCategory_id ? true : false
                                    }
                                >
                                    {subcategoryData?.length > 0 && subcategoryData && subcategoryData.map((v) => (
                                        console.log(v._id),
                                        (
                                            <MenuItem key={v._id} value={v._id}>
                                                {v.name}
                                            </MenuItem>
                                        )
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Product Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ""}

                        />

                        {/* <TextField
                            margin="dense"
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            error={errors.price && touched.price ? true : false}
                            helperText={errors.price && touched.price ? errors.price : ""}
                        /> */}

                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && touched.description ? true : false}
                            helperText={errors.description && touched.description ? errors.description : ""}
                        />

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>

                    </DialogContent>
                </form>
            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={productsdata?.lenght > 0 && productsdata.data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </>


    );
}