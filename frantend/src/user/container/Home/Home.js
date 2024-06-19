import React, { useContext, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFacilities } from '../../../redux/action/facilities.action';
import { ThemeContext } from '../../../context/ThemeContext';
import { bestSellerContext } from '../../../context/bestSellerContext';
import { GET_BESTSELLER } from '../../../context/ActionType';
import Button from '../../component/UI/Button/Button';
import { Link, NavLink, useParams } from 'react-router-dom';
import { getCategory } from '../../../redux/action/category.action';
import { getSubCategory } from '../../../redux/slice/subcategory.slice';

function Home(props) {

    const testimonialOption = {
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<div class="owl-prev"><i class="bi bi-arrow-left"></i></div>',
            '<div class="owl-next"><i class="bi bi-arrow-right"></i></div>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    }

    const vegetableOption = {
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<div class="owl-prev"><i class="bi bi-arrow-left"></i></div>',
            '<div class="owl-next"><i class="bi bi-arrow-right"></i></div>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFacilities());
        dispatch(getCategory());
        dispatch(getSubCategory());
    }, [])

    const facilities = useSelector(state => state.facilities)
    console.log(facilities);

    const themeContext = useContext(ThemeContext);
    console.log(themeContext);

    const BestSellerContext = useContext(bestSellerContext);
    console.log(BestSellerContext);

    const categories = useSelector((state) => state.category.category);
    console.log(categories);

    const [selectedCategory, setSelectedCategory] = useState('');
    console.log(selectedCategory);

    const subcategories = useSelector((state) => state.subCategories.subcategory);
    console.log(subcategories);

    const [subcategoriesData, setsubcategoriesData] = useState([]);
    console.log(subcategoriesData);

    useEffect(() => {
        const filteredSubcategory = subcategories.filter((item) => {
            return (
                item.category_id == selectedCategory
            )
        })

        setsubcategoriesData(filteredSubcategory)

        console.log("filteredSubcategory: ", filteredSubcategory);
    }, [selectedCategory])



    return (
        <div>
            {/* Hero Start */}
            <div className=
                {`container-fluid py-5 mb-5 hero-header ${themeContext.theme === 'dark' ? 'hero-header-dark' : ''}`}
            >
                <div className="container py-5">

                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
                            <h1 className="mb-5 display-3 text-primary">Organic Veggies &amp; Fruits Foods</h1>
                            <div className="position-relative mx-auto">
                                <input className={`form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill ${themeContext.theme}`} type="number" placeholder="Search" />
                                <Button
                                    type="submit"
                                    style={{ position: "absolute", top: 1, right: '25%' }}
                                    btnType="secondary"
                                >
                                    Submit Now
                                </Button>

                            </div>
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active rounded">
                                        <img src="img/hero-img-1.png" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                        <a href="#" className="btn px-4 py-2 text-white rounded">Fruites</a>
                                    </div>
                                    <div className="carousel-item rounded">
                                        <img src="img/hero-img-2.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <a href="#" className="btn px-4 py-2 text-white rounded">Vesitables</a>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hero End */}
            {/* Featurs Section Start */}
            <div className="container-fluid featurs py-5">
                <div className="container py-5">
                    <div className="row g-4">

                        {
                            facilities.facilities.map((v) => (
                                <div className="col-md-6 col-lg-3">
                                    <div className="featurs-item text-center rounded bg-light p-4">
                                        <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                            <i className="fas fa-car-side fa-3x text-white" />
                                        </div>
                                        <div className="featurs-content text-center">
                                            <h5>{v.name}</h5>
                                            <p className="mb-0">{v.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* Featurs Section End */}
            {/* Fruits Shop Start*/}
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h2>Our Organic Products</h2>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    {categories.map((category) => (
                                        // <Link to={`/category/${category._id}`} >
                                        <li className="nav-item">
                                            <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill">
                                                <span className="text-dark" style={{ width: 140 }} onClick={() => setSelectedCategory(category._id)}>{category.name}</span>
                                            </a>

                                        </li>
                                        // </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {selectedCategory ? subcategoriesData.map((subcategory) => (
                                                <div className="col-md-6 col-lg-4 col-xl-3">
                                                    <Link to={`/Shop/${subcategory._id}`}>
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <img src={subcategory.img.url} className="img-fluid w-100 rounded-top" alt style={{ height: '250px' }} />
                                                            </div>
                                                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                <h4>{subcategory.name}</h4>
                                                                <p>{subcategory.description}</p>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                                    <Button type='Base'>
                                                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )) : subcategories.map((subcategory) => (
                                                <>
                                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                                            </div>
                                                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                <h4>Grapes</h4>
                                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                                    <Button type='Base'>
                                                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                                            </div>
                                                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                <h4>Grapes</h4>
                                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                                    <Button type='Base'>
                                                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                                            </div>
                                                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                <h4>Grapes</h4>
                                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                                    <Button type='Base'>
                                                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            {/* <div className="col-md-6 col-lg-4 col-xl-3"> */}
                                            {/* <div className="rounded position-relative fruite-item"> */}
                                            {/* <div className="fruite-img"> */}
                                            {/* <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt /> */}
                                            {/* </div> */}
                                            {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                            {/* <div className="p-4 border border-secondary border-top-0 rounded-bottom"> */}
                                            {/* <h4>Grapes</h4> */}
                                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p> */}
                                            {/* <div className="d-flex justify-content-between flex-lg-wrap"> */}
                                            {/* <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p> */}
                                            {/* <Button type='Base'> */}
                                            {/* <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart */}
                                            {/* </Button> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* <div className="col-md-6 col-lg-4 col-xl-3"> */}
                                            {/* <div className="rounded position-relative fruite-item"> */}
                                            {/* <div className="fruite-img"> */}
                                            {/* <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt /> */}
                                            {/* </div> */}
                                            {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                            {/* <div className="p-4 border border-secondary border-top-0 rounded-bottom"> */}
                                            {/* <h4>Grapes</h4> */}
                                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p> */}
                                            {/* <div className="d-flex justify-content-between flex-lg-wrap"> */}
                                            {/* <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p> */}
                                            {/* <Button type='Base'> */}
                                            {/* <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart */}
                                            {/* </Button>                                                        </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* <div className="col-md-6 col-lg-4 col-xl-3"> */}
                                            {/* <div className="rounded position-relative fruite-item"> */}
                                            {/* <div className="fruite-img"> */}
                                            {/* <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt /> */}
                                            {/* </div> */}
                                            {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                            {/* <div className="p-4 border border-secondary border-top-0 rounded-bottom"> */}
                                            {/* <h4>Raspberries</h4> */}
                                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p> */}
                                            {/* <div className="d-flex justify-content-between flex-lg-wrap"> */}
                                            {/* <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p> */}
                                            {/* <Button type='Base'> */}
                                            {/* <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart */}
                                            {/* </Button>                                                        </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* <div className="col-md-6 col-lg-4 col-xl-3"> */}
                                            {/* <div className="rounded position-relative fruite-item"> */}
                                            {/* <div className="fruite-img"> */}
                                            {/* <img src="img/fruite-item-4.jpg" className="img-fluid w-100 rounded-top" alt /> */}
                                            {/* </div> */}
                                            {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                            {/* <div className="p-4 border border-secondary border-top-0 rounded-bottom"> */}
                                            {/* <h4>Apricots</h4> */}
                                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p> */}
                                            {/* <div className="d-flex justify-content-between flex-lg-wrap"> */}
                                            {/* <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p> */}
                                            {/* <Button type='Base'> */}
                                            {/* <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart */}
                                            {/* </Button>                                                        </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* <div className="col-md-6 col-lg-4 col-xl-3"> */}
                                            {/* <div className="rounded position-relative fruite-item"> */}
                                            {/* <div className="fruite-img"> */}
                                            {/* <img src="img/fruite-item-3.jpg" className="img-fluid w-100 rounded-top" alt /> */}
                                            {/* </div> */}
                                            {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                            {/* <div className="p-4 border border-secondary border-top-0 rounded-bottom"> */}
                                            {/* <h4>Banana</h4> */}
                                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p> */}
                                            {/* <div className="d-flex justify-content-between flex-lg-wrap"> */}
                                            {/* <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p> */}
                                            {/* <Button type='Base'> */}
                                            {/* <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart */}
                                            {/* </Button>                                                        </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* <div className="col-md-6 col-lg-4 col-xl-3"> */}
                                            {/* <div className="rounded position-relative fruite-item"> */}
                                            {/* <div className="fruite-img"> */}
                                            {/* <img src="img/fruite-item-1.jpg" className="img-fluid w-100 rounded-top" alt /> */}
                                            {/* </div> */}
                                            {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                            {/* <div className="p-4 border border-secondary border-top-0 rounded-bottom"> */}
                                            {/* <h4>Oranges</h4> */}
                                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p> */}
                                            {/* <div className="d-flex justify-content-between flex-lg-wrap"> */}
                                            {/* <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p> */}
                                            {/* <Button type='Base'> */}
                                            {/* <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart */}
                                            {/* </Button>                                                        </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* <div className="col-md-6 col-lg-4 col-xl-3"> */}
                                            {/* <div className="rounded position-relative fruite-item"> */}
                                            {/* <div className="fruite-img"> */}
                                            {/* <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt /> */}
                                            {/* </div> */}
                                            {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                            {/* <div className="p-4 border border-secondary border-top-0 rounded-bottom"> */}
                                            {/* <h4>Raspberries</h4> */}
                                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p> */}
                                            {/* <div className="d-flex justify-content-between flex-lg-wrap"> */}
                                            {/* <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p> */}
                                            {/* <Button type='Base'> */}
                                            {/* <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart */}
                                            {/* </Button>                                                        </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* <div className="col-md-6 col-lg-4 col-xl-3"> */}
                                            {/* <div className="rounded position-relative fruite-item"> */}
                                            {/* <div className="fruite-img"> */}
                                            {/* <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt /> */}
                                            {/* </div> */}
                                            {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                            {/* <div className="p-4 border border-secondary border-top-0 rounded-bottom"> */}
                                            {/* <h4>Grapes</h4> */}
                                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p> */}
                                            {/* <div className="d-flex justify-content-between flex-lg-wrap"> */}
                                            {/* <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p> */}
                                            {/* <Button type='Base'> */}
                                            {/* <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart */}
                                            {/* </Button>                                                        </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-2" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Grapes</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Raspberries</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-3" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Oranges</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Apple</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-4" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Grapes</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Apricots</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-5" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-3.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Banana</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Raspberries</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src="img/fruite-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h4>Oranges</h4>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className={`text-dark fs-5 fw-bold mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>$4.99 / kg</p>
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fruits Shop End*/}
            {/* Featurs Start */}
            <div className="container-fluid service py-5">
                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-secondary rounded border border-secondary">
                                    <img src="img/featur-1.jpg" className="img-fluid rounded-top w-100" alt />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-primary text-center p-4 rounded">
                                            <h5 className="text-white">Fresh Apples</h5>
                                            <h3 className="mb-0">20% OFF</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-dark rounded border border-dark">
                                    <img src="img/featur-2.jpg" className="img-fluid rounded-top w-100" alt />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-light text-center p-4 rounded">
                                            <h5 className="text-primary">Tasty Fruits</h5>
                                            <h3 className="mb-0 grey">Free delivery</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-primary rounded border border-primary">
                                    <img src="img/featur-3.jpg" className="img-fluid rounded-top w-100" alt />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-secondary text-center p-4 rounded">
                                            <h5 className="text-white">Exotic Vegitable</h5>
                                            <h3 className="mb-0">Discount 30$</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Featurs End */}
            {/* Vesitable Shop Start*/}
            <div className="container-fluid vesitable py-5">
                <div className="container py-5">
                    <h2 className={`mb-0 ${themeContext.theme === 'dark' ? 'text-white' : ''}`}>Fresh Organic Vegetables</h2>
                    <OwlCarousel {...vegetableOption} className="owl-carousel vegetable-carousel justify-content-center">
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Banana</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Bell Papper</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Potatoes</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Potatoes</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </div>
            {/* Vesitable Shop End */}
            {/* Banner Section Start*/}
            <div className="container-fluid banner bg-secondary my-5">
                <div className="container py-5">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <div className="py-4">
                                <h2 className="display-3 text-white">Fresh Exotic Fruits</h2>
                                <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
                                <p className="mb-4 text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p>
                                <a href="#" className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative">
                                <img src="img/baner-1.png" className="img-fluid w-100 rounded" alt />
                                <div className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute" style={{ width: 140, height: 140, top: 0, left: 0 }}>
                                    <h2 style={{ fontSize: 100 }} className='grey'>1</h2>
                                    <div className="d-flex flex-column">
                                        <span className="h2 mb-0 grey">50$</span>
                                        <span className="h4 text-muted mb-0 grey">kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner Section End */}
            {/* Bestsaler Product Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: 700 }}>
                        <h2 className="display-4 grey">Bestseller Products</h2>
                        <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-6 col-xl-4">
                            <div className={`p-4 rounded bg-light border border-secondary ${themeContext.theme}`}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img src="img/best-product-1.jpg" className="img-fluid rounded-circle w-100" alt />
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="h5">Organic Tomato</a>
                                        <div className="d-flex my-3">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <h4 className="mb-3">3.12 $</h4>
                                        <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className={`p-4 rounded bg-light border border-secondary ${themeContext.theme}`}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img src="img/best-product-2.jpg" className="img-fluid rounded-circle w-100" alt />
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="h5">Organic Tomato</a>
                                        <div className="d-flex my-3">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <h4 className="mb-3">3.12 $</h4>
                                        <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className={`p-4 rounded bg-light border border-secondary ${themeContext.theme}`}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img src="img/best-product-3.jpg" className="img-fluid rounded-circle w-100" alt />
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="h5">Organic Tomato</a>
                                        <div className="d-flex my-3">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <h4 className="mb-3">3.12 $</h4>
                                        <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className={`p-4 rounded bg-light border border-secondary ${themeContext.theme}`}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img src="img/best-product-4.jpg" className="img-fluid rounded-circle w-100" alt />
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="h5">Organic Tomato</a>
                                        <div className="d-flex my-3">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <h4 className="mb-3">3.12 $</h4>
                                        <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className={`p-4 rounded bg-light border border-secondary ${themeContext.theme}`}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img src="img/best-product-5.jpg" className="img-fluid rounded-circle w-100" alt />
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="h5">Organic Tomato</a>
                                        <div className="d-flex my-3">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <h4 className="mb-3">3.12 $</h4>
                                        <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className={`p-4 rounded bg-light border border-secondary ${themeContext.theme}`}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img src="img/best-product-6.jpg" className="img-fluid rounded-circle w-100" alt />
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="h5">Organic Tomato</a>
                                        <div className="d-flex my-3">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <h4 className="mb-3">3.12 $</h4>
                                        <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="text-center border border-secondary rounded">
                                <img src="img/fruite-item-1.jpg" className="img-fluid rounded" alt />
                                <div className="py-4">
                                    <a href="#" className="h5">Organic Tomato</a>
                                    <div className="d-flex my-3 justify-content-center">
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <h4 className="mb-3">3.12 $</h4>
                                    <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="text-center border border-secondary rounded">
                                <img src="img/fruite-item-2.jpg" className="img-fluid rounded" alt />
                                <div className="py-4">
                                    <a href="#" className="h5">Organic Tomato</a>
                                    <div className="d-flex my-3 justify-content-center">
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <h4 className="mb-3">3.12 $</h4>
                                    <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="text-center border border-secondary rounded">
                                <img src="img/fruite-item-3.jpg" className="img-fluid rounded" alt />
                                <div className="py-4">
                                    <a href="#" className="h5">Organic Tomato</a>
                                    <div className="d-flex my-3 justify-content-center">
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <h4 className="mb-3">3.12 $</h4>
                                    <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="text-center border border-secondary rounded">
                                <img src="img/fruite-item-4.jpg" className="img-fluid rounded" alt />
                                <div className="py-2">
                                    <a href="#" className="h5">Organic Tomato</a>
                                    <div className="d-flex my-3 justify-content-center">
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star text-primary" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <h4 className="mb-3">3.12 $</h4>
                                    <a href="#" className="btn border border-secondary rounded-pill text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bestsaler Product End */}
            {/* Fact Start */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className={`p-5 rounded ${themeContext.theme}`}>
                        <div className="row g-4 justify-content-center">
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className={`counter bg-white rounded p-5 border border-secondary ${themeContext.theme}`}>
                                    <i className="fa fa-users text-secondary" />
                                    <h4>satisfied customers</h4>
                                    <h2>1963</h2>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className={`counter bg-white rounded p-5 border border-secondary ${themeContext.theme}`}>
                                    <i className="fa fa-users text-secondary" />
                                    <h4>quality of service</h4>
                                    <h2>99%</h2>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className={`counter bg-white rounded p-5 border border-secondary ${themeContext.theme}`}>
                                    <i className="fa fa-users text-secondary" />
                                    <h4>quality certificates</h4>
                                    <h2>33</h2>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className={`counter bg-white rounded p-5 border border-secondary ${themeContext.theme}`}>
                                    <i className="fa fa-users text-secondary" />
                                    <h4>Available Products</h4>
                                    <h2>789</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fact Start */}
            {/* Tastimonial Start */}
            <div nav className="container-fluid testimonial py-5">
                <div className="container py-5">
                    <div className="testimonial-header text-center">
                        <h4 className="text-primary">Our Testimonial</h4>
                        <h2 className="display-5 mb-5 text-dark">Our Client Saying!</h2>
                    </div>
                    <OwlCarousel {...testimonialOption} className="owl-carousel testimonial-carousel">
                        <div className="testimonial-item img-border-radius rounded p-4 border-secondary border">
                            <div className="position-relative">
                                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    </p>
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Client Name</h4>
                                        <p className="m-0 pb-3">Profession</p>
                                        <div className="d-flex pe-5">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item img-border-radius rounded p-4 border-secondary border">
                            <div className="position-relative">
                                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    </p>
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Client Name</h4>
                                        <p className="m-0 pb-3">Profession</p>
                                        <div className="d-flex pe-5">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item img-border-radius rounded p-4 border-secondary border">
                            <div className="position-relative">
                                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    </p>
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Client Name</h4>
                                        <p className="m-0 pb-3">Profession</p>
                                        <div className="d-flex pe-5">
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                            <i className="fas fa-star text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </div>
            {/* Tastimonial End */}
        </div >

    );
}

export default Home;