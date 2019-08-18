const { interval, Observable, of } = require('rxjs');
const {
  switchAll,
  mergeAll,
  scan,
  map,
  filter,
  concatAll,
} = require('rxjs/operators');
const { multiply } = require('ramda');

/**
 * 'of' allows you to deliver values in a sequence.
 * In this case, it will emit 1,2,3,4,... in order.
 */
const dataSource = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const higherDataSource = of(
  dataSource,
  dataSource,
  dataSource,
  dataSource,
  dataSource,
);

higherDataSource.pipe(switchAll()).subscribe(console.log);

// observables are like functions but generalize those to allow multiple values.
// observables have no shared execution and are lazy.
// subscribing to an observable is analogous to calling a function.
// observables can return multiple values over time.
