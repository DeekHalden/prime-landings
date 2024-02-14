import { Controller } from "./controller.js";
import { qs } from "./qs.js";
import { StrategyManager } from "./strategies.js";
console.log(data)
const controller = new Controller({
  qs: qs,
  strategyManager: new StrategyManager(),
});
