"use client";

import "./page.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/app/login/page";
import Banner from "@/components/banner";
import axios from "axios";

export default function App() {
    const apiUrl = "https://api.realworld.io/api";
    axios
        .get(apiUrl + "/articles")
        .then(function (response) {
            // xử trí khi thành công
            console.log(response.data.articles);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {});

    // Bug ở đây :))))
    // axios
    //     .post(apiUrl + "/users", {
    //         user: {
    //             email: "jake@jake.jake",
    //             bio: "I like to skateboard",
    //             image: "https://i.stack.imgur.com/xHWG8.jpg",
    //         },
    //     })
    //     .then(function (response) {
    //         // xử trí khi thành công
    //         console.log(response.data.articles);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .finally(function () {});
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
        </Router>
    );
}

function Home() {
    return (
        <div className="home-page">
            <Header state="home"></Header>
            <Banner></Banner>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="">
                                        Your Feed
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="">
                                        Global Feed
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="article-preview">
                            <div className="article-meta">
                                <a href="profile.html">
                                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                                </a>
                                <div className="info">
                                    <a href="" className="author">
                                        Eric Simons
                                    </a>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> 29
                                </button>
                            </div>
                            <a href="" className="preview-link">
                                <h1>How to build webapps that scale</h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                            </a>
                        </div>

                        <div className="article-preview">
                            <div className="article-meta">
                                <a href="profile.html">
                                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                                </a>
                                <div className="info">
                                    <a href="" className="author">
                                        Albert Pai
                                    </a>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> 32
                                </button>
                            </div>
                            <a href="" className="preview-link">
                                <h1>
                                    The song you won't ever stop singiNo matter
                                    how hard you try.
                                </h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                            </a>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                <a href="" className="tag-pill tag-default">
                                    programming
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    javascript
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    emberjs
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    angular
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    react
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    mean
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    node
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    rails
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
