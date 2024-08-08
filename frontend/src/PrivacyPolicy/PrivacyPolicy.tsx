const PrivacyPolicy = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full md:w-[50em] flex-col p-4">
          <p className="text-2xl font-bold">
            Terms & Conditions + Privacy Policy for TeleS3
          </p>
          <div className="h-8"></div>
          <p>
            By using the TeleS3 webapp, you agree to the below stated clauses
          </p>
          <div className="h-4"></div>
          <p>
            The TeleS3 project is a free, opensource and unlimited file hosting
            platform. The project is maintained by @yashkolambekar on github
            under the repository yashkolambekar/teles3. The main teles3 webapp
            and the github repo are identical and no extra non-opensource
            components are not added in the app.
          </p>
          <div className="h-4"></div>
          <p>
            Failing to provide any of the directly or indirectly promised
            features does not hold the maintainer, the fork maintainer (if any)
            or the host-er responsible. The uptime of the service is not
            guranteed by any of the said individuals / organisations.
          </p>
          <div className="h-4"></div>
          <p>
            Any loss of data that may be caused due to software malfunction,
            uptime of the service or any other mediums is the responsibility of
            the user. And TeleS3 or the people involved in running teles3 and
            it's forks are not responsible for any financial or other types of
            losses caused.
          </p>
          <div className="h-4"></div>
          <p>
            The user's uploads are saved to the Telegram Bot by using TeleS3
            backend as a buffer. The files are temporarily stored only in the
            process of uploading the files to the backend of the webapp. Once
            uploading is done, the files are erased from the TeleS3 servers and
            the files solely live on Telegram's servers. If Telegram decides to
            delete the files or ban the bot from their platform, the user might
            loose the data.
          </p>
          <div className="h-4"></div>
          <p>
            As of 05 August 2024, the file identifiers obtained from the
            Telegram Bots are stored on the TeleS3 servers without any
            encryption or salting, in plain text format. The latest methods
            shall be obtained from the github repository
          </p>
          <div className="h-4"></div>
          <p>
            The files uploaded by the users are accessible directly by the owner
            of the bot and the people who are part of the chat that the data is
            being dumped to. Therefore the users are advised to host their own
            backend and use their own bots for privacy. Uploading any private,
            sensitive or valuable files / information is not advised.
          </p>
          <div className="h-4"></div>
          <p>
            By using the webapp or any of it's forks, you agree that you are
            responsible for your files / data and it's consequences. The
            maintainer, fork-er or the host-er are by any means, not responsible
            for anything.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
