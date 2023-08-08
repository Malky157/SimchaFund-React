import React, { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ message, event }) => {
    const [alertVariables, setAlertVariables] = useState({
        variant: '',
        backgroundColor: '',
        color: '',
        text: ''
    })
    useEffect(() => {
        determineAlertMessage();
    }, [])
    const determineAlertMessage = () => {
        if (event === 'simcha') {
            if (message === 'success') {
                const copy = { ...alertVariables };
                copy.variant = 'success',
                    copy.backgroundColor = '#daf7d7',
                    copy.color = 'black',
                    copy.text = 'Simcha added successfully'
                setAlertVariables(copy)
            } else if (event === 'warning') {
                const copy = { ...alertVariables };
                copy.variant = 'warning',
                    copy.backgroundColor = '#f5cdd3',
                    copy.color = 'black',
                    copy.text = 'Simcha was not added successfully, please try again'
                setAlertVariables(copy)
            }
        }
        else if (event === 'unsuccessfullUpdate') {
            const copy = { ...alertVariables };
            copy.variant = 'warning',            
            copy.backgroundColor = '#fff8d2',
                copy.color = 'black',
                copy.text = message
            setAlertVariables(copy)
        }

    }


    return <>
        <Alert dismissible={true} variant={alertVariables.variant} style={{ backgroundColor: alertVariables.backgroundColor, color: alertVariables.color }} >{alertVariables.text}</Alert>
    </>
}
export default AlertMessage;;