import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col items-center px-4">
        <div className="w-full md:w-[50em]">
          <p className="text-slate-400">
            TeleS3 or Telegram S3 is a <span className="italic">free, opensource</span> and{" "}
            <span className="italic">unlimited</span> file sharing/hosting
            platform based on{" "}
            <Link
              className="underline text-slate-300"
              to={"https://core.telegram.org/bots/api"}
            >
              Telegram Bot API
            </Link>. Anyone is free to host/share files <span className="text-slate-300">under 20 MB</span> forever. Please refer the <Link className="underline text-slate-300" to={'/privacy-policy'}>Privacy Policy</Link> before using the service.
          </p>
        </div>
        <div className="border-b pt-4 border-slate-300 w-full md:w-[50em] border-dotted"></div>
      </div>
    </>
  );
};

export default Hero;
