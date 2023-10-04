import { setupWorker } from "msw";
import { loginHandlers } from "./loginHandlers";

export const worker = setupWorker(...loginHandlers);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}