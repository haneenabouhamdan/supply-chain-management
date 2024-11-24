class QueriesStore {
  #store = new Map<string, Record<string, any>>();

  update(queryName: string, variables: Record<string, any>) {
    this.#store.set(queryName, variables);
  }

  get(queryName: string) {
    return this.#store.get(queryName);
  }
}

const queriesStore = new QueriesStore();
export { queriesStore as QueriesStore };
