import { History } from 'umi';

export function onRouteChange({ location, routes, action }) {
  console.log(111);
  console.log(location.pathname);
}
