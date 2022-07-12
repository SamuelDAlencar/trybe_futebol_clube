import * as express from 'express';
import userRouter from './user';
import teamsRouter from './team';

const router = express.Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);

export default router;
