import { useState } from "react";

export const Pronoun = () => {
  const [pronoun, setPronoun] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPronoun(e.currentTarget.pronoun.value);
        }}
        className="flex-center xs:flex-row xs:items-center flex-col items-start gap-2"
      >
        <label htmlFor="pronoun">Personal pronoun</label>
        <input list="presets" id="pronoun" name="pronoun" />
        <datalist id="presets">
          <option value="they/them" />
          <option value="she/her" />
          <option value="he/him" />
        </datalist>
        <button type="submit">Submit</button>
      </form>

      <p>Submitted pronoun: {pronoun}</p>
    </>
  );
};
