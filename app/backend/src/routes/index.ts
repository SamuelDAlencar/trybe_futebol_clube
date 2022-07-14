import * as express from 'express';
import userRouter from './user';
import teamsRouter from './team';
import matchesRouter from './match';

const router = express.Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
