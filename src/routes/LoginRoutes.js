import React from 'react';
import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(
	lazy(() => import('pages/authentication/Register')),
);
const AuthProposal = Loadable(
	lazy(() => import('pages/authentication/Proposal')),
);

const AuthRequirementBoard = Loadable(
	lazy(() => import('pages/authentication/RequirementBoard')),
);

const AuthProposalDetail = Loadable(
	lazy(() => import('pages/authentication/ProposalDetail')),
);

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
	path: '/auth',
	element: <MinimalLayout />,
	children: [
		{
			path: 'login',
			element: <AuthLogin />,
		},
		{
			path: 'sign-up',
			element: <AuthRegister />,
		},
		{
			path: 'requirementBoard',
			element: <AuthRequirementBoard />,
		},
		{
			path: 'proposal',
			element: <AuthProposal />,
		},
		{
			path: 'proposalDetail',
			element: <AuthProposalDetail />,
		},
	],
};

export default LoginRoutes;
