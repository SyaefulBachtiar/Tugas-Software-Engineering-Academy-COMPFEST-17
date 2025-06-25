import { NavLink } from "react-router-dom";

export default function Button({ link, text }){
    return(
        <NavLink
        to={link}
        className={`w-[100px] h-[40px] text-white bg-[#0099ff] flex items-center justify-center text-center rounded-md border hover:bg-blue-500`}
        >
            {text}
        </NavLink>
    )
}