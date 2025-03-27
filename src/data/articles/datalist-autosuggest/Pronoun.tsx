import type { FormEvent } from "react";

import { useState } from "react";

const PRONOUN_OPTIONS = ["they/them", "she/her", "he/him"];

export const Pronoun = () => {
  const [pronoun, setPronoun] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setPronoun(formData.get("pronoun") as string);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <label htmlFor="pronoun" className="font-semibold">
          Personal Pronoun
        </label>
        <input
          list="presets"
          id="pronoun"
          name="pronoun"
          placeholder="Select or type your pronoun"
        />
        <datalist id="presets">
          {PRONOUN_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </datalist>
        <button type="submit">Submit</button>
      </form>

      <p>Submitted pronoun: {pronoun}</p>
    </>
  );
};
