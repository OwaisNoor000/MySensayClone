import ProfilePicture from "../assets/pp.jpg"
export default function Header(){
    return(
        <header className="w-full flex flex-row justify-end items-center fixed top-0 left-0">
            <span className="m-5 font-bold text-white">ReadMe</span>
            <img src={ProfilePicture} className="rounded-full m-5" style={{height:"50px", width:"50px"}}/>
        </header>
    );
}