import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategory } from '../../../redux/slice/subcategory.slice';
import { getProducts } from '../../../redux/action/products.action';
import { getCategory } from '../../../redux/action/category.action';
import { useParams } from 'react-router-dom';

function Product(props) {

    const { id } = useParams();
    console.log(id);

    const dispatch = useDispatch();
    const subCategories = useSelector((state) => state.subCategories.subcategory);
    console.log(subCategories);

    const categories = useSelector((state) => state.category.category);
    console.log(categories);

    const product = useSelector((state) => state.products.products.data);
    console.log(product);

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getSubCategory());
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="container mt-5 pt-5">
            <h1>Product</h1>
            <div className="row mt-5">
                {product?.map((product) => (
                    <div className="col-4 gy-5" key={product.id}>
                        <div className="card ">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p><h5 className='d-inline'>category:</h5> {categories.find((category) => category.id === product.categoryId).name}</p>
                                <p className="card-text"><h5 className='d-inline'>SubCategories: </h5> {subCategories.find((subcategory) => subcategory.id === product.subcategoryId).name}</p>
                                <p className="card-text">{product.description.slice(0, 90) + "..."}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;