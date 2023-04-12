import { useState, ChangeEvent } from "react";

interface Props {
  id: number;
}

const Question: React.FC<Props> = ({ id }) => {
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  return (
    <div className="mb-6 rounded-xl bg-gray-50 p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold">Question {id}</h3>

      <input
        type="text"
        value={answer}
        onChange={handleAnswerChange}
        placeholder={`Enter your answer for Question ${id} here`}
        className="w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 dark:border-gray-600 dark:bg-gray-700"
      />
    </div>
  );
};

export default Question;
