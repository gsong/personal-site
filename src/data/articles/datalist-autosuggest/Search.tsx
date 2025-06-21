import { generate } from "random-words";
import React from "react";

import { ActionNames, initState, reducer } from "./reducer";

export const Search = () => {
  const { state, context, actions } = useMachine();

  return (
    <>
      <SearchForm
        draft={context.draft}
        sortedRecentTerms={context.sortedRecentTerms}
        canSubmit={context.canSubmit}
        onDraftChange={actions.updateDraft}
        onSubmit={actions.submit}
      />
      <StatusDisplay state={state} term={context.term} />
    </>
  );
};

interface SearchFormProps {
  draft: string;
  sortedRecentTerms: string[];
  canSubmit: boolean;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchForm = ({
  draft,
  sortedRecentTerms,
  canSubmit,
  onDraftChange,
  onSubmit,
}: SearchFormProps) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    className="flex flex-wrap gap-2"
  >
    <label htmlFor="term">Search term</label>
    <input
      id="term"
      name="term"
      list="recent-terms"
      value={draft}
      onChange={(e) => onDraftChange(e.currentTarget.value)}
    />
    <datalist id="recent-terms" key={draft}>
      {sortedRecentTerms.map((term) => (
        <option key={term} value={term} />
      ))}
    </datalist>
    <button type="submit" disabled={!canSubmit}>
      Search
    </button>
  </form>
);

interface StatusDisplayProps {
  state: string;
  term: string;
}

const StatusDisplay = ({ state, term }: StatusDisplayProps) => (
  <p>
    {state === "submitting" ? "Submitting" : "Submitted"} term: {term}
  </p>
);

const useMachine = () => {
  const [{ state, context }, dispatch] = React.useReducer(reducer, initState);

  React.useEffect(() => {
    dispatch({
      type: ActionNames.INITIALIZE,
      payload: [...new Set(generate(100))],
    });
  }, []);

  React.useEffect(() => {
    if (state === "submitting") {
      setTimeout(() => dispatch({ type: ActionNames.RESOLVED }), 2000);
    }
  }, [state]);

  const actions = {
    updateDraft: (payload: string) =>
      dispatch({ type: ActionNames.UPDATE_DRAFT, payload }),
    submit: () => dispatch({ type: ActionNames.SUBMIT }),
  };

  return { state, context, actions };
};
