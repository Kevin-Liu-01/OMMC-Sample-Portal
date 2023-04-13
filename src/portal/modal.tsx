import { useSession } from "next-auth/react";

interface Props {
  showModal: boolean;
  setShowModal: (arg0: boolean) => void;
  teamName: string;
  showConfetti: (arg0: boolean) => void
}

const Modal: React.FC<Props> = ({ showModal, setShowModal, teamName, showConfetti }) => {
  const { data: session } = useSession();
  //Get all stored states from local storage
  const teamMember = localStorage.getItem("TEAM_MEMBER");
  const started = localStorage.getItem("STARTED");
  const q1 = localStorage.getItem("Q1");
  const q2 = localStorage.getItem("Q2");
  const q3 = localStorage.getItem("Q3");

  const submissionHandler = async () => {
    setShowModal(false);
    showConfetti(true);
    //Submit to database
    await fetch("/api/trpc/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamMember: teamMember,
        teamName: teamName,
        started: started,
        q1: q1,
        q2: q2,
        q3: q3,
        username: session?.user.name || "",
        email: session?.user.email || "",
        image: session?.user.image || "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    setTimeout(() => {
      showConfetti(false);
    }, 2000);
  };

  return (
    <>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl xl:max-w-4xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-2xl border-0 bg-white shadow-lg outline-none duration-150 focus:outline-none dark:bg-gray-700">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5 duration-150 dark:border-slate-800">
                  <h3 className="text-2xl font-semibold xl:text-3xl">
                    Ready to submit?
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-slate-900 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <div className="my-3 text-lg leading-relaxed text-slate-500 duration-150 dark:text-slate-400">
                    <p> You will be able to submit another set of answers.</p>
                    <p className="text-base italic">
                      Submitting for Team {teamName}.
                    </p>{" "}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6 duration-150 dark:border-slate-800">
                  <button
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear hover:text-red-600 focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mr-1 mb-1 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-emerald-600 hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="submit"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => submissionHandler()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" fixed inset-0 z-40 bg-black opacity-40 "></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
