import React from 'react';
import StateTest from "./StateTest";
import {Button} from "@mui/material";

const DefaultPage = () => {
	let variable = 0;

	const onClickPropsCheck = ()=>{
		// eslint-disable-next-line no-console
		console.log("DefaultPage variable : ", variable);
	}

	return <>
	<StateTest property={variable}/>
		<br/>
		<br/>
		<Button onClick={onClickPropsCheck} variant={"contained"}> props test</Button>
	</>;
};

export default DefaultPage;
