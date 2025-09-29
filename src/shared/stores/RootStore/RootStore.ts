import { makeAutoObservable } from 'mobx';

export class RootStore {
  // Здесь можно добавить любые состояния
  someData: string = '';

  constructor(initialData: Partial<RootStore>) {
    makeAutoObservable(this);
    Object.assign(this, initialData);
  }

  setSomeData(data: string) {
    this.someData = data;
  }
}

// Тип инициализации хранилища
export type RootStoreInitData = Partial<RootStore>;