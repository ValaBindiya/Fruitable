import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/action/category.action";
import { Link } from "react-router-dom";

function Category() {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.category.category);
    console.log(categories);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    return (
        <div className="container mt-5 pt-5">
            <h1>Categories</h1>
            <div className="row mt-5">
                {categories.map((category) => (

                    <div className="col-4 gy-5">
                        <Link to={`/category/${category._id}`} >
                            <div className="card ">
                                <div className="card-body">
                                    <img src={category.img.url} alt="category-img" style={{ width: "100%", height: "250px", objectFit: "cover" }} />
                                    <h5 className="card-title">{category.name}</h5>
                                    <p className="card-text">{category.description.slice(0, 90) + "..."}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div >
    );
}

export default Category;