import { type ChangeEvent } from "react";

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
    <div className="mb-4 rounded-xl bg-gray-50 p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold">Question {id}</h3>
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
