import { Controller } from "./controller.js";
import { qs } from "./qs.js";
import { StrategyManager } from "./strategies.js";

const controller = new Controller({
  qs: qs,
  strategyManager: new StrategyManager(),
});
