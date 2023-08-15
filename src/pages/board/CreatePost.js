import React from 'react';
import * as Yup from 'yup';
import {
	Button,
	FormHelperText,
	Grid,
	Stack,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import {Formik} from 'formik';
import {createPost} from 'api/board';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {useSelector} from 'react-redux';

const CreatePost = () => {
	// [api 연결] useSnackbar에서 enqueueSnackbar 가져오기
	const {enqueueSnackbar} = useSnackbar();

	// [이벤트 매핑] Todo: useNavigate에서 navigate 가져오기
	// 작성해주세요.

	// [이벤트 매핑] store에서 user State 가져오기
	const user = useSelector((state) => state.user);
	const {id, name} = user;

	const goBackList = () => {
		// [이벤트 매핑] Todo: 게시판 페이지로 이동(/board)
		// 작성해주세요.
	};

	return (
		<>
			<Formik
				initialValues={{
					title: '',
					content: '',
					author: {
						// [이벤트 매핑] user 정보 입력
						authorId: id,
						authorName: name,
					},
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					// [이벤트 매핑] title validation : string 타입, 최대 255자, 필수(작성 안하면 '제목은 필수입니다.')
					title: Yup.string().max(255).required('제목은 필수입니다.'),
				})}
				onSubmit={async (values, {setSubmitting}) => {
					// [api 연결] 중복 방지를 위해 isSubmitting 상태 변경
					setSubmitting(true);
					// [api 연결] Todo: 게시글 작성 api 호출
					// 작성해주세요

					setSubmitting(false);

					// [api 연결]  snackbar를 이용해 api 호출 결과 피드백
					enqueueSnackbar('게시글을 등록하였습니다.', {
						variant: 'success',
					});
					// [이벤트 매핑] Todo: 게시판 페이지로 이동지('/board')
					// 작성해주세요.
				}}
			>
				{({
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
					isSubmitting,
					touched,
					values,
				}) => (
					<form noValidate onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={24} md={12}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='title'
										value={values.title}
										name='title'
										onChange={handleChange}
										placeholder='제목을 입력하세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.title && errors.title && (
										<FormHelperText
											error
											id='helper-text-title-signup'
										>
											{errors.title}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<TextareaAutosize
										id='content'
										name='content'
										minRows={5}
										aria-label='maximum height'
										placeholder='내용을 입력하세요'
										value={values.content}
										style={customStyle}
										onBlur={handleBlur}
										onChange={handleChange}
									/>
								</Stack>
							</Grid>
							{errors.submit && (
								<Grid item xs={12}>
									<FormHelperText error>
										{errors.submit}
									</FormHelperText>
								</Grid>
							)}
							<Grid
								container
								justifyContent='flex-end'
								style={{marginTop: 10}}
								spacing={2}
							>
								<Grid item>
									<Button
										disableElevation
										disabled={isSubmitting}
										size='large'
										// [api 연결] submit 버튼으로 지정
										type='submit'
										variant='contained'
										color='primary'
									>
										등록
									</Button>
								</Grid>
								<Grid item>
									<Button
										disableElevation
										size='large'
										variant='contained'
										// [이벤트 매핑] 클릭시 게시판 페이지로 돌아가는 함수 매핑
										onClick={goBackList}
										color='error'
									>
										취소
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</>
	);
};

export default CreatePost;

const customStyle = {
	padding: '10.5px 14px 10.5px 12px',
	font: 'inherit',
	borderRadius: '4px',
	borderColor: '#d9d9d9',
};
