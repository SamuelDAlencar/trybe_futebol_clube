import * as express from 'express';
import userRouter from './user';
import teamsRouter from './team';
import matchesRouter from './match';
import leaderboardRouter from './leaderboard';

const router = express.Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
