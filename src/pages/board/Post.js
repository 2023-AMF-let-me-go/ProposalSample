import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deletePost, getPost} from 'api/board';
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Divider,
	Grid,
	InputLabel,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useSnackbar} from 'notistack';

const Post = () => {
	// [api 연결] useSnackbar에서 enqueueSnackbar 가져오기
	const {enqueueSnackbar} = useSnackbar();

	// [이벤트 매핑] useNavigate에서 navigate 가져오기
	const navigate = useNavigate();

	//url에서 param 가져오기
	const {id} = useParams();

	// [api 연결] Todo: post(기본값 : null), isDeleteLoading(기본값 : false)을 컴포넌트 State로 선언(useState)
	// 작성해주세요.
	const [post, setPost] = useState(null);
	// isDeleteLoading을 state로 선언해주세요.

	useEffect(() => {
		// [api 연결] Todo: 로딩 시 게시글 상세 api 호출 함수 실행
		// 작성해주세요.
	}, [id]);

	const findPost = async () =>{
		// [api 연결] Todo: 게시글 상세 api 호출 후 결과 받기
		// 작성해주세요.
		// [api 연결] Todo: post에 api 호출 결과값 매핑
		// 작성해주세요.
	}

	const goBackList = () => {
		// [이벤트 매핑] Todo: 게시판 페이지로 이동('/board')
		// 작성해주세요.
	};

	const deleteClick = async () => {
		try {
			// [api 연결] Todo: 중복 api 호출 방지를 위해 isDeleteLoading 상태 true로 변경
			// 작성해주세요.

			// [api 연결] Todo: 게시글 삭제 api 호출
			// 작성해주세요.

			enqueueSnackbar('게시글이 삭제되었습니다.', {variant: 'success'});

			// [api 연결] Todo: 중복 api 호출 후 delete 버튼 활성화를 위해 isDeleteLoading false로 변경
			// 작성해주세요.

			// [이벤트 매핑] Todo: 게시판 페이지로 이동('/board')
			// 작성해주세요.
		} catch (err) {
			enqueueSnackbar(err, {variant: 'error'});
			// [api 연결] Todo: 중복 api 호출 후 delete 버튼 활성화를 위해 isDeleteLoading false로 변경
		}
	};

	const updatePost = async () => {
		// [이벤트 매핑] 게시글 수정 페이지로 이동. 상태 값을 같이 전달
		navigate(`/post/update`, {
			state: {
				id: id,
				title: post.title,
				content: post.content,
			},
		});
	};

	return (
		<>
			<Stack direction='row' spacing={2}>
				<Grid container>
					<Grid item>
						<Button
							variant='contained'
							// [이벤트 매핑] Todo: 목록 버튼을 클릭하면 게시글 목록페이지 페이지로 이동해야 합니다.
							// onClick={매핑해주세요.}
						>
							목록
						</Button>
					</Grid>
				</Grid>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<Button
							variant='outlined'
							// [이벤트 매핑] Todo: 수정 버튼을 클릭하면 게시글 수정 페이지로 이동해야 합니다.
							// onClick={매핑해주세요.}
							style={{marginRight: 10}}
						>
							수정
						</Button>
					</Grid>
					<Grid item>
						<LoadingButton
							variant='contained'
							// [이벤트 매핑] Todo: 삭제 버튼을 클릭하면 게시글 삭제 api가 호출됩니다.
							// onClick={매핑해주세요.}
							color='error'
							// [api 연결] Todo: isLoading이 true면 버튼이 비활성화 됩니다. isDeleteLoading을 매핑해주세요.
							// loading={매핑해주세요.}
						>
							삭제
						</LoadingButton>
					</Grid>
				</Grid>
			</Stack>
			<Card sx={{p: 2}} style={{borderRadius: '8px', marginTop: 15}}>
				<Toolbar>
					<Typography
						sx={{flex: '1 1 100%'}}
						variant='h4'
						id='tableTitle'
						component='div'
					>
						{post?.title ? post.title : ''}
					</Typography>
				</Toolbar>
				<Divider />
				<CardContent>
					{post ? (
						<Grid item xs={12}>
							<Stack spacing={1}>
								<Grid container justifyContent='flex-end'>
									<InputLabel htmlFor='desc-signup'>
										{'작성자 : '}
										{post.author}
									</InputLabel>
								</Grid>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='내용'
								>
									{post.content}
								</Typography>
							</Stack>
						</Grid>
					) : (
						<Box
							sx={{py: 3, minHeight: 560}}
							style={{textAlign: 'center'}}
						>
							<CircularProgress />
						</Box>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default Post;
