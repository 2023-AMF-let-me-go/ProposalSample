import React from 'react';
import {Button} from "@mui/material";

// eslint-disable-next-line react/prop-types
const StateTest = ({property}) => {
    const [state, setState] = React.useState(0);
    // eslint-disable-next-line no-console
    console.log("StateTest rerender");

    let variable = 0;

    const onClickStateButton = ()=>{
        setState(state+1);
        // eslint-disable-next-line no-console
        console.log("StateTest state : " , state);
    }
    const onClickVariableButton = ()=>{
        variable++;
        // eslint-disable-next-line no-console
        console.log("StateTest variable : ", variable);
    }

    const onClickPropsButton = ()=>{
        property++;
        // eslint-disable-next-line no-console
        console.log("StateTest property", property);
    }

    return <>
        <Button onClick={onClickStateButton} variant={"contained"}>State: {state}</Button>
        <br/>
        <br/>
        <Button onClick={onClickVariableButton} variant={"contained"}>Variable: {variable}</Button>
        <br/>
        <br/>
        <Button onClick={onClickPropsButton} variant={"contained"}>Props: {property}</Button>
    </>;
};

export default StateTest;
