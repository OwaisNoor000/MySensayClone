type Props = {
    text:string;
};

export default function Message({text}:Props){
    return(
        <div className="w-1/2 flex flex-row justify-end">
            <div className="p-5 w-[300px] rounded-2xl text-white  right-0 bg-[#424242]">
                {text}
            </div>
        </div>
    );
}