import { useEffect, useState } from "react";

const Alert = ({success, showAlert, message} : any) => {

    const [color, setColor] = useState("");
    const [borderColor, setBorderColor] = useState("");

    useEffect(() => {
        if(success){
            setColor('text-green-700');
            setBorderColor('border-green-700');
        }else{
            setColor('text-red-300');
            setBorderColor('border-red-300');
        }
    }, [success])




    if(showAlert){
        return (
            <>
                <div className="fixed bottom-0 w-full flex flex-col items-center">
                    <div className="w-full md:w-[50em] flex flex-col p-4">
                        <div className={`border bg-[#0C0C0E] border-dotted ${borderColor} p-2 rounded-md`}>
                            <p className={`${color}`}>{message}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }else{
        return (
            <>
            </>
        )
    }

}

export default Alert;