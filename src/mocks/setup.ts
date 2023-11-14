import { setupWorker } from 'msw';
import { loginHandlers } from './loginHandlers';
import { scheduleHandler } from './ScheduleHandlers';
import { postsHandlers } from './postsHandlers';
import { infoEditHandlers } from './infoEidtHandlers';
import { travelHandlers } from './travelHandlers';
import { savedHandlers } from './savedHandlers';

export const worker = setupWorker(
  ...loginHandlers,
  ...scheduleHandler,
  ...postsHandlers,
  ...savedHandlers,
  ...infoEditHandlers,
  ...travelHandlers
);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
