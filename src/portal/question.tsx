import { type ChangeEvent } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

interface Props {
  id: number;
  state: string;
  setState: (arg0: string) => void;
}

const Question: React.FC<Props> = ({ id, state, setState }) => {
  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  return (
    <div className="mb-4 rounded-xl bg-gray-50 p-4 shadow-md dark:bg-gray-800 md:p-6">
      <div className="mb-4 flex flex-row items-center">
        <h3 className="text-sm font-semibold md:text-xl">Question {id}</h3>
        {state && (
          <>
            <CheckCircleIcon className="ml-auto h-5 w-5 text-emerald-500 " />
            <span className="ml-2 text-xs md:text-base">Saved Locally</span>
          </>
        )}
      </div>
      <input
        type="text"
        value={state}
        onChange={handleAnswerChange}
        placeholder={`Enter your answer for Question ${id} here`}
        className="w-full rounded-lg border border-gray-400 bg-gray-200 px-4 py-2 dark:border-gray-600 dark:bg-gray-700"
        required
        maxLength={30}
      />
    </div>
  );
};

export default Question;
