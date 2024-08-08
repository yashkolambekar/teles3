import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="p-4 pb-2 flex flex-col md:items-center">
        <Link to={'/'} className="text-slate-300 text-[1.5em] font-black">TeleS3</Link>
        {/* <div className="border-b mt-2 border-slate-300 w-full md:w-[50em] border-dotted"></div> */}
      </div>
    </>
  );
};

export default Header;
