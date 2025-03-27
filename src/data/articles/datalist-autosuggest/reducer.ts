/** State machine states */
const StateType = {
  INITIAL: "initial",
  EDITING: "editing",
  SUBMITTING: "submitting",
} as const;

/** Possible action names */
export const ActionNames = {
  INITIALIZE: "initialize",
  UPDATE_DRAFT: "updateDraft",
  SUBMIT: "submit",
  RESOLVED: "resolved",
} as const;

export type StateType = (typeof StateType)[keyof typeof StateType];
export type ActionType = keyof typeof ActionNames;

/** Context containing all the form data */
interface Context {
  draft: string;
  term: string;
  recentTerms: string[];
  sortedRecentTerms: string[];
  canSubmit: boolean;
  hasSubmitted: boolean;
}

/** The complete state shape */
interface State {
  state: StateType;
  context: Context;
}

/** Initial state of the reducer */
export const initState: State = {
  state: StateType.INITIAL,
  context: {
    draft: "",
    term: "",
    recentTerms: [],
    sortedRecentTerms: [],
    canSubmit: false,
    hasSubmitted: false,
  },
};

/** Union type of all possible actions */
type Action =
  | { type: typeof ActionNames.INITIALIZE; payload: string[] }
  | { type: typeof ActionNames.UPDATE_DRAFT; payload: string }
  | { type: typeof ActionNames.SUBMIT; payload?: undefined }
  | { type: typeof ActionNames.RESOLVED; payload?: undefined };

export const reducer: React.Reducer<State, Action> = (
  data: State,
  action: Action,
) => {
  const { type } = action;
  const payload = "payload" in action ? action.payload : undefined;
  const { state, context } = data;

  switch (state) {
    case StateType.INITIAL: {
      switch (type) {
        case ActionNames.INITIALIZE:
          if (!payload || !Array.isArray(payload)) {
            return data;
          }
          return {
            state: StateType.EDITING,
            context: {
              ...context,
              recentTerms: payload,
              sortedRecentTerms: sortRecentTerms(payload, ""),
            },
          };
        default:
          return data;
      }
    }
    case StateType.EDITING:
      switch (type) {
        case ActionNames.UPDATE_DRAFT:
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
        case ActionNames.SUBMIT:
          if (context.draft.trim() === "") return data;

          return {
            state: StateType.SUBMITTING,
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
    case StateType.SUBMITTING:
      switch (type) {
        case ActionNames.RESOLVED:
          return {
            state: StateType.EDITING,
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
  if (partial === "") return recentTerms;

  let terms = [...recentTerms];
  const sorted: string[] = [];

  for (const filter of sortFilters(partial)) {
    const filteredTerms = terms.filter(filter);
    sorted.push(...filteredTerms.sort((a, b) => a.localeCompare(b)));
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
