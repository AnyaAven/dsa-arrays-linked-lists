import { LLStr } from "../common/ll";

/** return average (mean) of list values.
 *
 * Returns 0 for empty list.
 **/

function average(lst: LLStr): number {
  if (lst.head === null || lst.tail === null) return 0;

  let current = lst.head;
  let sum = 0;
  while (current) {
    sum += Number(current.val)
    if(current.next === null) break;
    current = current.next;
  }

  return sum / lst.length;
}

export { average };