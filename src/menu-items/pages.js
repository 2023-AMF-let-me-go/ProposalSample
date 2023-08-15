// assets
import {LoginOutlined, ProfileOutlined} from '@ant-design/icons';

// icons
const icons = {
	LoginOutlined,
	ProfileOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
	id: 'authentication',
	title: '인증',
	type: 'group',
	children: [
		{
			id: 'login',
			title: 'Login',
			type: 'item',
			url: '/auth/login',
			icon: icons.LoginOutlined,
			target: true,
		},
		{
			id: 'register',
			title: 'Register',
			type: 'item',
			url: '/auth/sign-up',
			icon: icons.ProfileOutlined,
			target: true,
		},
		{
			id: 'requirementBoard',
			title: 'RequirementBoard',
			type: 'item',
			url: '/auth/requirementBoard',
			icon: icons.ProfileOutlined,
			target: true,
		},
		{
			id: 'proposal',
			title: 'Proposal',
			type: 'item',
			url: '/auth/proposal',
			icon: icons.ProfileOutlined,
			target: true,
		},
		{
			id: 'proposalDatail',
			title: 'ProposalDetail',
			type: 'item',
			url: '/auth/proposalDatail',
			icon: icons.ProfileOutlined,
			target: true,
		},
	],
};

export default pages;
