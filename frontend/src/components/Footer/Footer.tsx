import { Link } from "react-router-dom";
import githubLogo from "../../assets/github.svg";

const Footer = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full md:w-[50em] flex-col px-4 pb-8 items-center justify-center">
        <div className="border-t pb-4 border-slate-300 w-full md:w-[50em] border-dotted"></div>
            <Link  to={'https://github.com/yashkolambekar/teles3'} className="flex flex-col items-center pt-4">
              <div className="flex items-center justify-center gap-2">
                <img src={githubLogo}  className="w-[2em]"/>
                <p>yashkolambekar/teles3</p>
              </div>
                <p className="mt-2 text-[0.8em]">for Source code, issues and feature requests</p>
            </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
