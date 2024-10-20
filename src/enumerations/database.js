export let BoardTemplates = {
  Kanban: 'Kanban',
};

export let BoardTemplateColumns = {
  [BoardTemplates.Kanban]: {
    Todo: 'Todo',
    InProgress: 'InProgress',
    Completed: 'Completed',
  },
};

export let BoardTemplateIds = {
  Kanban: 0,
};

export let BoardTemplateColumnIds = {
  [BoardTemplates.Kanban]: {
    [BoardTemplateColumns[BoardTemplates.Kanban].Todo]: 0,
    [BoardTemplateColumns[BoardTemplates.Kanban].InProgress]: 1,
    [BoardTemplateColumns[BoardTemplates.Kanban].Completed]: 2,
  },
};
