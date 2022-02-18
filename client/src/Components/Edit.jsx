import React, { useEffect, useState, useContext } from 'react'
import User from './User'
import "./edit.css"
import { Context } from '../Context/Context';
import { axiosInstance } from '../config';
import { Link } from 'react-router-dom';
export default function Edit() {

    const { user } = useContext(Context);

    const [userLinks, setuserLinks] = useState([]);

    const [stext, setText] = useState("")
    const [slink, setLink] = useState("")


    const [show, setshow] = useState(true);

    const [refData, setrefData] = useState(true)


    const [windowSize, setWindowSize] = useState(null)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])



    const PostLink = async () => {

        try {


            await axiosInstance.put("/links/", {
                username: user.username,
                links: [...userLinks, { text: stext, link: slink }]
            });
            setrefData(!refData);
            setText("");
            setLink("");

        } catch (error) {
            console.log(error);
            console.log("Error sending links to database!");
        }

    }

    const deleteData = async (val, ind) => {
        // setuserLinks(userLinks.splice(ind, 1));
        const ARR = userLinks.filter((v, i) => {

            return i !== ind
        })
        setuserLinks(ARR);
        try {


            await axiosInstance.put("/links/", {
                username: user.username,
                links: ARR
            });
            setrefData(!refData);

        } catch (error) {
            console.log(error);
        }




    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        setuserLinks([...userLinks, { text: stext, link: slink }]);

        PostLink();
    }

    useEffect(() => {
        const getUserLink = async () => {
            try {
                const resLink = await axiosInstance.get("/links/" + user.username);
                setuserLinks(resLink.data.links);

            }
            catch (err) {
                console.log("error getting links!")
                console.log(err);
            }

        }
        getUserLink(user.username);

    }, [user.username])


    const ToggleDisplay = (e) => {

        if (windowSize < 1000) {
            if (e.target.innerText === "CLOSE") {
                e.target.innerText = "PREVIEW"

            }
            else
                e.target.innerText = "CLOSE";

            setshow(!show);

        }

    }

    return (
        <div className='EditPage'>
            <div className='bg-white text-dark rounded AdminEdit_Section'>
                <div className='edit_section'>

                    <h4>Add Links</h4>
                    <form onSubmit={HandleSubmit}>
                        <div className="input-group flex-nowrap api_input mb-3">

                            <input type="text" className="form-control" placeholder="Text"
                                aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setText(e.target.value)} value={stext} required />

                            <input type="text" className="form-control" placeholder="Link"
                                aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setLink(e.target.value)} value={slink} required />
                            <button className='ml-3 btn btn-primary' type='submit'>Add</button>
                        </div>

                    </form>
                    {/* </BackLink> */}

                    <div className='AllLinks'>
                        {userLinks.map((val, ind) => {
                            return (<div key={ind} className='text_link mb-2 p-2' >

                                <div> {`text: ${val.text} `}</div> <button onClick={() => deleteData(val, ind)}>X</button>
                                <div>{`link: ${val.link}`}</div>

                            </div>)
                        })}

                    </div>

                    <button className='display_userlinks' onClick={(e) => ToggleDisplay(e)}>CLOSE</button>
                </div>

                <div className={`${(windowSize > 1000 || show) ? `d-block` : `d-none`} display_section `}>
                    <div className='p-2 bg-dark'>
                        <div className='text-white pl-2'>To- <Link to="/" className='text-light' > Home Page</Link></div>

                        <div className='text-white pl-2'>To- <Link to={`/user/${user.username}`} className='text-light' target="_blank"> DEV_Profile</Link></div>

                    </div>
                    <User refData={refData} />
                </div>
            </div>
        </div >

    )
}
