import { axiosInstance } from '../config';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import "./User.css"


export default function Ruser(props) {


    const location = useLocation();
    const path = location.pathname.split("/")[2];


    const [userLinks, setuserLinks] = useState([]);

    const [github, setgithub] = useState("");
    const [dev, setdev] = useState("");


    const [Article, setArticle] = useState([]);
    const [Repo, setRepo] = useState([]);
    const [pic, setPic] = useState("")
    const [blog, setblog] = useState(false);
    const [seeRepo, setseeRepo] = useState(false);

    const DisplayBlog = () => {
        if (blog)
            setblog(false);
        else
            setblog(true);
    }

    const DisplayRepo = () => {
        if (seeRepo)
            setseeRepo(false);
        else
            setseeRepo(true);
    }



    useEffect(() => {

        // /links/
        const getUserLink = async () => {

            try {

                const resUser = await axiosInstance.get("/auth/" + path);

                setgithub(resUser.data.g_user);
                setdev(resUser.data.d_user);


                try {
                    const resLink = await axiosInstance.get("/links/" + path);
                    setuserLinks(resLink.data.links);

                }
                catch (err) {
                    console.log(err);
                }

            }
            catch (err) {
                alert(`User with username ${path} does not exist`);
            }










        }

        getUserLink();


        if (dev) {

            const getDev = async () => {
                try {
                    const res = await axiosInstance.get(`https://dev.to/api/articles?username=${dev}`);
                    setArticle(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
            getDev();
        }


        if (github) {

            const getGithub = async () => {
                try {
                    const res = await axiosInstance.get(`https://api.github.com/users/${github}/repos`);
                    setRepo(res.data);

                    const rt = await axiosInstance.get(`https://api.github.com/users/${github}`);

                    setPic(rt.data.avatar_url);

                } catch (error) {
                    console.log(error);
                }
            }
            getGithub();

        }




    }, [dev, github, path])


    return (
        <div className='R_Usercontainer'>

            <div className='d-flex flex-column justify-content-center align-items-center pt-5'>

                <div> <img src={pic ? pic : "https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1641744456~hmac=5f3eef94695f4a24f36969726311261c"} alt="" className='userimg' /> </div>

                <div className='pt-2'> <h5> <a href={`https://github.com/${github}`} rel="noreferrer" target="_blank">{path}</a>  </h5></div>

                {/* Dev api  */}
                {dev && (<div className='LinkButton' onClick={DisplayBlog}>  Read my blogs </div>)}

                {blog && <div className='Blogs'>
                    {Article.map((val, ind) => {
                        return (<Dropdown title={val.title} key={val.id} link={val.url} />)

                    })}
                </div>}



                {/* Github Api */}
                {github && (<div className='LinkButton' onClick={DisplayRepo}>Checkout my Github Projects</div>)}

                {seeRepo && <div className='Blogs'>
                    {Repo.map((val, ind) => {
                        return (
                            <>  {(!val.fork && val.homepage) ? <Dropdown title={val.name} key={val.id} link={val.homepage} /> : ""}</>
                        )

                    })}
                </div>}

                {userLinks.map((val, ind) => {
                    return (<a key={ind} className='LinkButton links'
                        href={val.link} target="_blank" rel="noreferrer">  {val.text}

                    </a>)
                })}



            </div>
        </div>
    )
}
