import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategory } from '../../../redux/slice/subcategory.slice';
import { Link, useParams } from 'react-router-dom';

function Subcategory(props) {

    const { id } = useParams();
    console.log(id);

    const [subCategorydata, setSubCategoryData] = useState([]);
    console.log(subCategorydata);

    const dispatch = useDispatch();

    const subCategories = useSelector((state) => state.subCategories.subcategory);
    console.log(subCategories);

    const categories = useSelector((state) => state.category.category);
    console.log(categories);

    useEffect(() => {
        dispatch(getSubCategory());

        const data = subCategories.filter((v) => v.category_id === id);
        console.log(data);
        setSubCategoryData(data);

    }, []);

    return (
        <div className="container mt-5 pt-5">
            <h1>SubCategory</h1>
            <div className="row mt-5">
                {subCategorydata.map((subcategory) => (
                    <div className="col-4 gy-5">
                        <Link to={`/subcategory/${subcategory._id}`} >
                            <div className="card ">
                                <div className="card-body">
                                    <h5 className="card-title">{subcategory.name}</h5>
                                    <p className='card-text d-inline'><h5 className='d-inline'>category:</h5> {subCategories.find((category) => category.id === subcategory.categoryId).name}</p>
                                    <p className="card-text">{subcategory.description.slice(0, 90) + "..."}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subcategory;