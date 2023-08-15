import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {proposal} from 'ApiService';
import {Grid, Stack, Typography, TextField, Button} from '@mui/material';

import {DataGrid} from '@mui/x-data-grid';
// project import
import FirebaseRegister from './auth-forms/AuthRegister';
import AuthListWrapper from './AuthListWrapper';
import {useNavigate, useLocation} from 'react-router-dom';

import log from 'loglevel'; // loglevel 불러오기

const USER_NAME = localStorage.getItem('USER_NAME') ?? '판매인';
const USER_EMAIL = localStorage.getItem('USER_ID') ?? 'seller@many.com';
const USER_TELINFO = localStorage.getItem('USER_TELINFO') ?? '010-1234-5678';

import PropTypes from 'prop-types';

const ProposalDetail = ({fetchReadData, fetchProposalData, seller}) => {
	const location = useLocation();
	const [readData, setReadData] = useState(location.state.fetchReadData);
	const [proposalReadData, setProposalReadData] = useState(
		location.state.fetchProposalData,
	);
	const isSeller = location.state.seller;
	useEffect(() => {
		const fetchedReadData = {
			// readData,
			requirementId: readData.id,
			title: readData.title,
			customerId: readData.customerId,
			customerName: readData.customerName,
			customerEmail: readData.customerEmail,
			customerTelInfo: readData.customerTelInfo,
			destination: readData.area,
			startSchedule: readData.startSchedule,
			endSchedule: readData.endSchedule,
			adultCount: readData.cntAdult,
			childCount: readData.cntChild,
			purpose: readData.title,
			budget: readData.budget,
			details: readData.travelDetail,
		};

		setDest(readData.area);
		setDepartureDate(readData.startSchedule);
		setReturnDate(readData.endSchedule);
		setReadData(fetchedReadData);
	}, [location.state?.fetchReadData]);

	const [dest, setDest] = useState(readData.destination);
	const [departureDate, setDepartureDate] = useState(readData.startSchedule);
	const [returnDate, setReturnDate] = useState(readData.endSchedule);
	const [budget, setBudget] = useState(readData?.budget);

	const handleDepartureDateChange = (event) => {
		const inputDate = event.target.value;
		if (/^\d{0,8}$/.test(inputDate)) {
			if (inputDate.length === 8) {
				const formattedDate = formatDateString(inputDate);
				setDepartureDate(formattedDate);
			} else {
				setDepartureDate(inputDate);
			}
		} else {
			setDepartureDate('');
		}
	};

	const handleReturnDateChange = (event) => {
		const inputDate = event.target.value;
		if (/^\d{0,8}$/.test(inputDate)) {
			if (inputDate.length === 8) {
				const formattedDate = formatDateString(inputDate);
				setReturnDate(formattedDate);
			} else {
				setReturnDate(inputDate);
			}
		} else {
			setReturnDate('');
		}
	};

	const handleBudgetChange = (event) => {
		const value = event.target.value;
		setBudget(value);
	};

	const [proposalDetails, setProposalDetails] = useState('');

	const handleProposalChange = (event) => {
		const value = event.target.value;
		setProposalDetails(value);
	};

	const handleSubmit = (values) => {
		const proposalData = {
			requirementId: readData.requirementId, //readData.Id,
			title: readData.title,
			travelDetail: proposalDetails, //
			customerId: readData.customerId,
			customerName: readData.customerName,
			customerEmail: readData.customerEmail,
			customerTelInfo: readData.customerTelInfo,
			area: dest,
			startSchedule: departureDate, //
			endSchedule: returnDate, //
			cntAdult: readData.adultCount, //readData.adultCount,
			cntChild: readData.childCount, //readData.childCount,
			purpose: readData.purpose,
			budget: budget, //
			createTime: new Date(),
			modifyTime: new Date(),
			sellerId: USER_EMAIL,
			sellerName: USER_NAME,
			sellerTelInfo: USER_TELINFO,
		};
		// alert('제출누를때 데이터 : ' + JSON.stringify(proposalData));
		proposal(proposalData).then(() => {
			window.location.href = '/auth/RequirementBoard';
		});

		// setSent(true);
	};

	const formatDateString = (dateString) => {
		const year = dateString.slice(0, 4);
		const month = dateString.slice(4, 6);
		const day = dateString.slice(6, 8);
		if (isNaN(year) || isNaN(month) || isNaN(day)) {
			return null;
		}
		const date = new Date(year, month - 1, day);
		if (isNaN(date.getTime())) {
			return null;
		}
		const formattedYear = date.getFullYear();
		const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
		const formattedDay = String(date.getDate()).padStart(2, '0');
		return `${formattedYear}/${formattedMonth}/${formattedDay}`;
	};

	const handleDestinationChange = (event) => {
		const value = event.target.value;
		setDest(value);
	};

	const handleEditableTextareaChange = (event) => {
		const {name, value} = event.target;
		setReadData((prevData) => ({...prevData, [name]: value}));
	};

	const handleSuggestButtonClick = () => {
		log.info('Suggestion Button Clicked');
	};

	const navigate = useNavigate();

	const handleCancelButtonClick = () => {
		navigate(-1);
	};
	if (!readData) {
		return <div>Loading...</div>;
	}

	return (
		<AuthListWrapper>
			<Grid container spacing={1}>
				<Grid item xs={2}>
					<TextField
						label='여행지'
						variant='outlined'
						fullWidth
						value={readData.destination}
						InputLabelProps={{shrink: true}}
						disabled
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='st'
						variant='outlined'
						fullWidth
						value={readData.startSchedule}
						InputLabelProps={{shrink: true}}
						disabled
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='end'
						variant='outlined'
						fullWidth
						value={readData.endSchedule}
						InputLabelProps={{shrink: true}}
						disabled
					/>
				</Grid>
				<Grid item xs={1}>
					<TextField
						label='성인'
						variant='outlined'
						fullWidth
						type='number'
						name='adultCount'
						value={readData.adultCount}
						disabled
					/>
				</Grid>
				<Grid item xs={1}>
					<TextField
						label='아동'
						variant='outlined'
						fullWidth
						type='number'
						name='childCount'
						value={readData.childCount}
						disabled
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='여행목적'
						variant='outlined'
						fullWidth
						defaultValue='여행목적'
						value={readData.purpose}
						disabled
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='예산'
						variant='outlined'
						fullWidth
						type='number'
						name='budget'
						value={readData.budget}
						disabled
					/>
				</Grid>
			</Grid>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Grid item xs={12}>
						<TextField
							label='요청서'
							multiline
							rows={4}
							variant='outlined'
							fullWidth
							disabled
							value={readData.details}
						/>
					</Grid>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='여행지'
						variant='outlined'
						fullWidth
						defaultValue='여행지'
						value={proposalReadData.area}
						onChange={handleDestinationChange}
						InputLabelProps={{shrink: true}}
						disabled
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='출발일'
						inputProps={{maxLength: 8}}
						value={proposalReadData.startSchedule}
						onChange={handleDepartureDateChange}
						InputLabelProps={{
							shrink: true,
						}}
						disabled
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='귀국일'
						inputProps={{maxLength: 8}}
						value={proposalReadData.endSchedule}
						onChange={handleReturnDateChange}
						InputLabelProps={{
							shrink: true,
						}}
						disabled
					/>
					{/* 위의 코드 숫자입력이 안먹는거 같은데  */}
				</Grid>
				<Grid item xs={1}>
					<TextField
						label='성인'
						variant='outlined'
						fullWidth
						type='number'
						name='adultCount'
						value={readData.adultCount}
						disabled
					/>
				</Grid>
				<Grid item xs={1}>
					<TextField
						label='아동'
						variant='outlined'
						fullWidth
						type='number'
						name='childCount'
						value={readData.childCount}
						disabled
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='여행목적'
						variant='outlined'
						fullWidth
						defaultValue='여행목적'
						value={readData.purpose}
						disabled
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label='제안예산'
						variant='outlined'
						fullWidth
						type='number'
						onChange={handleBudgetChange}
						value={proposalReadData.budget}
						disabled
					/>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid item xs={12}>
					<TextField
						label='제안서'
						multiline
						rows={4}
						variant='outlined'
						fullWidth
						defaultValue='제안 내용을 입력해주세요'
						onChange={handleProposalChange}
						value={proposalReadData.travelDetail}
						disabled
					/>
				</Grid>
			</Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='baseline'
				>
					<Button
						variant='outlined'
						// onClick={proposalSave}
						onClick={handleSubmit}
						disabled={!isSeller}
					>
						제안
					</Button>
					<Button
						variant='outlined'
						onClick={handleCancelButtonClick}
					>
						취소
					</Button>
				</Stack>
			</Grid>
		</AuthListWrapper>
	);
};

ProposalDetail.propTypes = {
	fetchReadData: PropTypes.array.isRequired,
	fetchProposalData: PropTypes.array.isRequired,
	seller: PropTypes.bool.isRequired,
};

export default ProposalDetail;
