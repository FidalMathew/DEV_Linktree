import { axiosInstance } from '../config';
import React, { useEffect, useState, useContext } from 'react'
import Dropdown from './Dropdown';
import { Context } from '../Context/Context';
import "./User.css"

export default function User(props) {

    const { user } = useContext(Context);
    const [userLinks, setuserLinks] = useState([]);


    let dev = user.d_user;
    let github = user.g_user;

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


    }, [dev, github])


    useEffect(() => {
        const getUserLink = async () => {
            try {
                const resLink = await axiosInstance.get("/links/" + user.username);
                setuserLinks(resLink.data.links);

            }
            catch (err) {
                console.log("error");
            }

        }
        getUserLink();


    }

        , [props.refData, user.username])
    return (
        <div className='Usercontainer'>

            <div className='d-flex flex-column justify-content-center align-items-center pt-5'>

                <div> <img src={pic ? pic : "https://cdn-icons-png.flaticon.com/512/64/64572.png"} alt="" className='userimg' /> </div>

                <div className='pt-2'> <h5> <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">{user.username}</a>  </h5></div>

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
