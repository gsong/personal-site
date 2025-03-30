export const useStateDiagram = `
sequenceDiagram
  participant setState
  participant state

setState -->> state: replace with new state
`;

export const useReducerDiagram = `
sequenceDiagram
  autonumber

  participant dispatch
  participant state
  participant reducer

  par
  dispatch ->> reducer: action
  state ->> reducer: current state
  end

  reducer ->> reducer: compute new state

  reducer -->> state: replace with new state
`;

export const formStateDiagram = `
stateDiagram-v2
  [*] --> editing
  editing --> editing: change
  editing --> editing: reset
  editing --> submitting: submit
  submitting --> resolved: resolve
  submitting --> rejected: reject
  resolved --> editing
  rejected --> editing
`;
