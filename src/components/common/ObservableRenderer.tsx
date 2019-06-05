import * as React from "react";
import { Observable } from "rxjs";

interface Props<T> {
  observable: Observable<T>;
  initialData?: T;
  children: (snapshot: AsyncSnapshot<T>) => React.ReactElement;
}

function StreamRenderer<T>({
  observable,
  initialData,
  children
}: Props<T>): React.ReactElement {
  const [snapshot, setSnapshot] = React.useState(
    new AsyncSnapshot(ConnectionState.waiting, initialData, undefined)
  );

  React.useEffect(() => {
    const subscription = observable.subscribe(
      data =>
        setSnapshot(new AsyncSnapshot(ConnectionState.active, data, undefined)),
      error =>
        setSnapshot(
          new AsyncSnapshot<T>(ConnectionState.active, undefined, error)
        ),
      () =>
        setSnapshot(
          new AsyncSnapshot<T>(ConnectionState.done, undefined, undefined)
        )
    );

    return () => subscription.unsubscribe();
  }, [observable]);

  return children(snapshot);
}

class AsyncSnapshot<T> {
  constructor(
    public connectionState: ConnectionState,
    private _data?: T,
    public error?: Error
  ) {}

  get data() {
    if (this._data === undefined) {
      throw "";
    }

    return this._data;
  }

  get hasData(): boolean {
    return this._data !== undefined;
  }

  get hasError(): boolean {
    return this.error !== undefined;
  }
}

enum ConnectionState {
  none = "NONE",
  waiting = "WAITING",
  active = "ACTIVE",
  done = "DONE"
}

export default StreamRenderer;
