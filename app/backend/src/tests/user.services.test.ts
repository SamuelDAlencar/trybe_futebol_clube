// import { it } from 'mocha';
// import * as jwt from 'jsonwebtoken';
// import * as chai from 'chai';
// import * as sinon from 'sinon';
// const { expect } = chai;import UserModel from '../database/models/users';

// import userService from '../services/user.services';
// import { IService } from '../interfaces/index';


// describe('userServices - login method', () => {
//   before(() => {
//     sinon.stub(UserModel, 'findOne')
//       .resolves({
//         email: 'email@email.com',
//         password: 'correctPassword',
//       } as UserModel);

//     sinon.stub(jwt, 'sign')
//       .resolves('token');
//   });

//   after(() => {
//     (UserModel.findOne as sinon.SinonStub).restore();
//     (jwt.sign as sinon.SinonStub).restore();
//   });

//   it('Should return a token', () => {
//     const response = userService.login({
//       email: 'email@email.com',
//       password: 'correctPassword',
//     });
//   });
// });
