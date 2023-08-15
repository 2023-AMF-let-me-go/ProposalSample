import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// material-ui
import {
	Grid,
	Stack,
	Typography,
	TextField,
	Button,
	DateRangePicker,
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
// project import
import FirebaseRegister from './auth-forms/AuthRegister';
import AuthListWrapper from './AuthListWrapper';
import {useNavigate} from 'react-router-dom';

import {
	requirementList,
	proposalList,
	proposalListByRequirementId,
} from 'ApiService';

import log from 'loglevel'; // loglevel 불러오기

const USER_ROLE = 'SELLER'; //localStorage.getItem('USER_ROLE');
const USER_NAME = localStorage.getItem('USER_NAME') ?? '사용자';
const USER_EMAIL = localStorage.getItem('USER_ID') ?? 'seller@many.com';
const USER_TELINFO = localStorage.getItem('USER_TELINFO') ?? '010-1234-5678';

const RequirementBoard = () => {
	const navigate = useNavigate();
	const [selectedRequirementId, setSelectedRequirementId] = useState(null);
	const [showProposalButton, setShowProposalButton] = useState(false);
	const [showProposal, setShowProposal] = useState(false);
	const [readData, setReadData] = useState([]);
	// const [showProposalButton, setShowProposalButton] = useState(false);
	const [proposalData, setProposalData] = useState([]);
	const [readProposalData, setReadProposalData] = useState([]);

	// 상단 그리드에서 사용할 컬럼 정의
	const requirementColumns = [
		{field: 'id', headerName: 'ID', width: 50},
		{field: 'title', headerName: '제목', width: 100},
		// {field: 'travelDetail', headerName: '여행 상세 내용', width: 0},
		{field: 'customerId', headerName: '고객 ID', width: 100},
		// {field: 'customerName', headerName: '고객명', width: 0},
		// {field: 'customerEmail', headerName: '고객 이메일', width: 0},
		// {field: 'customerTelInfo', headerName: '고객 전화번호', width: 0},
		{field: 'area', headerName: '지역', width: 100},
		{field: 'startSchedule', headerName: '시작일', width: 100},
		{field: 'endSchedule', headerName: '종료일', width: 100},
		{field: 'cntAdult', headerName: '성인', width: 50},
		{field: 'cntChild', headerName: '어린이', width: 50},
		{field: 'budget', headerName: '예산', width: 150},
		// {field: 'createTime', headerName: '생성일', width: 0},
		// {field: 'modifyTime', headerName: '수정일', width: 0},
	];

	// 상단 그리드에서 사용할 데이터 정의
	const [requirementRows, setRequirementRows] = useState([]);

	useEffect(() => {
		async function fetchRequirementData() {
			const rows = await requirementList();
			setRequirementRows(rows);
		}
		fetchRequirementData();
	}, []);

	// 하단 그리드에서 사용할 컬럼 정의

	const proposalColumns = [
		{field: 'id', headerName: 'ID', width: 50},
		{field: 'sellerName', headerName: '판매자', width: 100},
		{field: 'sellerId', headerName: '판매자 이메일', width: 125},
		{field: 'sellerTelInfo', headerName: '판매자 전화번호', width: 125},
		// {field: 'title', headerName: '제목', width: 200},
		{field: 'area', headerName: '지역', width: 100},
		{field: 'startSchedule', headerName: '시작일', width: 100},
		{field: 'endSchedule', headerName: '종료일', width: 100},
		{field: 'budget', headerName: '예산', width: 150},
	];

	const [proposalRows, setProposalRows] = useState([]);

	useEffect(() => {
		async function fetchProposalData() {
			const rows = await proposalList();
			setProposalRows(rows);
		}
		fetchProposalData();
	}, []);

	// 상단 그리드에서 행을 클릭할 때마다 호출되는 이벤트 핸들러
	const handleRequirementRowClick = (params) => {
		const rowData = params.row;
		setSelectedRequirementId(params.row.id);
		// alert(`선택한 고객명: ${params.row.id}`);
		if (USER_ROLE === 'SELLER') {
			setShowProposalButton(true);
		}

		setReadData(rowData);
	};

	// 제안서 작성 버튼 클릭 시 호출되는 이벤트 핸들러
	const handleProposalButtonClick = () => {
		// alert(JSON.stringify(readData));
		navigate('../proposal', {
			state: {fetchReadData: readData},
		});
	};

	function handleProposalRowClick(params) {
		const rowData = params.row;
		setReadProposalData(rowData);
	}

	function handleProposalRowDoubleClick(params) {
		if (USER_EMAIL === readProposalData.sellerEmail) {
			navigate('../proposalDetail', {
				state: {
					fetchReadData: readData,
					fetchProposalData: readProposalData,
					seller: true,
				},
			});
		} else {
			navigate('../proposalDetail', {
				state: {
					fetchReadData: readData,
					fetchProposalData: readProposalData,
					seller: false,
				},
			});
		}
		// navigate('../proposalDetail', {
		// 	state: {fetchReadData: readData, fetchProposalData: proposalRows},
		// });
	}

	return (
		<AuthListWrapper>
			<div>
				<h2>여행조건 리스트</h2>
				<DataGrid
					rows={requirementRows}
					columns={requirementColumns}
					pageSize={5}
					onRowClick={handleRequirementRowClick}
				/>
				{selectedRequirementId && (
					<div>
						<h2>제안 리스트</h2>
						<DataGrid
							rows={proposalRows.filter(
								(row) =>
									row.requirementId === selectedRequirementId,
							)}
							columns={proposalColumns}
							onRowClick={handleProposalRowClick}
							onRowDoubleClick={handleProposalRowDoubleClick}
							pageSize={5}
						/>
						<Button
							variant='contained'
							color='primary'
							onClick={handleProposalButtonClick}
						>
							제안서 작성
						</Button>
					</div>
				)}
			</div>
		</AuthListWrapper>
	);
};

export default RequirementBoard;
