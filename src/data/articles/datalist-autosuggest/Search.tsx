import React from "react";

import { generate } from "random-words";

export const Search = () => {
  const {
    state,
    context,
    actions: { updateDraft, submit },
  } = useMachine();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex-center xs:flex-row xs:items-center flex-col items-start gap-2"
      >
        <label htmlFor="term">Search term</label>
        <input
          id="term"
          name="term"
          list={"recent-terms"}
          value={context.draft}
          onChange={(e) => updateDraft(e.currentTarget.value)}
        />
        <datalist id="recent-terms" key={context.draft}>
          {context.sortedRecentTerms.map((term: string) => (
            <option key={term} value={term} />
          ))}
        </datalist>

        <button type="submit" disabled={!context.canSubmit}>
          Search
        </button>
      </form>

      <p>
        {state === "submitting" ? "Submitting" : "Submitted"} term:{" "}
        {context.term}
      </p>
    </>
  );
};

const useMachine = () => {
  const [{ state, context }, dispatch] = React.useReducer(reducer, initState);

  React.useEffect(() => {
    dispatch({ type: "initialize", payload: [...new Set(generate(100))] });
  }, []);

  React.useEffect(() => {
    if (state === "submitting") {
      setTimeout(() => dispatch({ type: "resolved" }), 2000);
    }
  }, [state]);

  const actions = {
    updateDraft: (payload: string) =>
      dispatch({ type: "updateDraft", payload }),
    submit: () => dispatch({ type: "submit" }),
  };

  return { state, context, actions };
};

const initState = {
  state: "initial",
  context: {
    draft: "",
    term: "",
    recentTerms: [],
    sortedRecentTerms: [],
    canSubmit: false,
    hasSubmitted: false,
  },
};

type Action =
  | { type: "initialize"; payload: string[] }
  | { type: "updateDraft"; payload: string }
  | { type: "submit"; payload?: undefined }
  | { type: "resolved"; payload?: undefined };

interface State {
  state: string;
  context: {
    draft: string;
    term: string;
    recentTerms: string[];
    sortedRecentTerms: string[];
    canSubmit: boolean;
    hasSubmitted: boolean;
  };
}

const reducer: React.Reducer<State, Action> = (data: State, action: Action) => {
  const { type } = action;
  const payload = "payload" in action ? action.payload : undefined;
  const { state, context } = data;

  switch (state) {
    case "initial": {
      switch (type) {
        case "initialize":
          if (!payload || !Array.isArray(payload)) {
            return data;
          }
          return {
            state: "editing",
            context: {
              ...context,
              recentTerms: payload,
              sortedRecentTerms: isSafari ? payload : [],
            },
          };
        default:
          return data;
      }
    }
    case "editing":
      switch (type) {
        case "updateDraft":
          if (typeof payload !== "string") {
            return data;
          }
          return {
            state,
            context: {
              ...context,
              draft: payload,
              sortedRecentTerms: sortRecentTerms(context.recentTerms, payload),
              canSubmit:
                payload.trim() !== "" &&
                trimLower(payload) !== trimLower(context.term),
            },
          };
        case "submit":
          if (context.draft.trim() === "") return data;

          return {
            state: "submitting",
            context: {
              ...context,
              term: context.draft.trim(),
              recentTerms: addRecentTerm(context.recentTerms, context.draft),
              canSubmit: false,
              hasSubmitted: true,
            },
          };
        default:
          return data;
      }
    case "submitting":
      switch (type) {
        case "resolved":
          return {
            state: "editing",
            context,
          };
        default:
          return data;
      }
    default:
      return data;
  }
};

const addRecentTerm = (recentTerms: string[], term: string) =>
  [term, ...recentTerms]
    .reduce((unique: string[], item) => {
      if (!unique.some((e) => trimLower(e) === trimLower(item))) {
        unique.push(item.trim());
      }
      return unique;
    }, [])
    .slice(0, 100);

const sortRecentTerms = (recentTerms: string[], term: string) => {
  const partial = trimLower(term);
  if (partial === "") return isSafari ? recentTerms : [];

  let terms = [...recentTerms];
  const sorted: string[] = [];

  for (const filter of sortFilters(partial)) {
    const filteredTerms = terms.filter(filter).sort();
    sorted.push(...filteredTerms);
    terms = terms.filter((t) => !filteredTerms.includes(t));
  }

  return sorted;
};

const sortFilters = (partial: string) => [
  (t: string) => trimLower(t).startsWith(partial),
  (t: string) => RegExp(`\\b${partial}`, "i").test(t),
  (t: string) => RegExp(partial, "i").test(t),
];

const trimLower = (term: string) => term.trim().toLowerCase();

const isSafari =
  typeof navigator !== "undefined" &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
