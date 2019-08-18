// A subject is like an observable, but can multicast to many observers.
// Subjects are like EventEmitters: they maintain a registry of many listeners.
// Every subject is an observable.
// From the perspective of the observer, it cannot tell whether the Observable
// execution is coming from a plain unicast Observable or a Subject.
// Internally to the Subject, subscribe does not invoke a new execution that delivers
// values. It simply registers the given Observer in a list of observers, similarly
// to how 'addListener' usually works in other libraries and languages.
const { from, Subject, Observable } = require('rxjs');
// const { from } = require('rxjs/operators');

const subject = new Subject();

subject.subscribe({
  next(v) {
    console.log(`ObserverA: ${v}`);
  },
});
subject.subscribe({
  next(v) {
    console.log(`ObserverB: ${v}`);
  },
});

const observable = from([1, 2, 3, 4, 5, 6]);
observable.subscribe(subject);

// subject.next(1);
// subject.next(2);
// subject.next(3);
