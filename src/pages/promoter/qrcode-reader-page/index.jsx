import React, {useState} from 'react';
import PageContainer from "../../../components/page_container";
import ButtonPrimary from "../../../components/button_primary";

import {QrReader} from 'react-qr-reader';
import DarkInput from "../../../components/dark_input";
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Snackbar} from "@mui/material";
import { AiOutlineArrowRight } from 'react-icons/ai';

function QrCodeReaderPage() {
    const [manualCode, setManualCode] = useState('');
    const [alert, setAlert] = useState({ showAlert: false, message: '', severity: 'error'})

    const { standId, standName } = useParams();
    const navigate = useNavigate();

    const handleQrCodeResult = (result, error) => {
        if (!!result) {
            navigate(`/promoter/confirmation/${result?.text}/${standId}`)
        }
    }

    const handleConfirmAction = () => {
        if(!manualCode) {
            setAlert({ showAlert: true, message: 'Preencha o código do usuário, antes de prosseguir.', severity: 'error' })
            return;
        }

        navigate(`/promoter/confirmation/${manualCode}/${standId}`)
    }

    return (
        <PageContainer goBackAction={() => navigate(-1)} hasLogo>
            <Snackbar
                open={alert.showAlert}
                autoHideDuration={4000}
                onClose={() => setAlert({ ...alert, showAlert: false})}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>

            <ButtonPrimary title={standName}/>

            <div style={{width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '20px', marginBottom: '50px'}}>
                <div style={{width: '300px'}}>
                    <QrReader
                        onResult={(result, error) => handleQrCodeResult(result, error)}
                        style={{width: '100%'}}
                        constraints={{ facingMode: { exact: "environment" } }}
                    />
                </div>
                <div style={{display:'flex' , justifyContent:'center', alignItems:'center'}}>
                    <DarkInput type="text" placeholder="Código" value={manualCode} onChange={(e) => setManualCode(e.target.value)} style={{borderRadius:'8px 0 0 8px'}}/>
                    <ButtonPrimary title={<AiOutlineArrowRight/>} onClick={handleConfirmAction} style={{width:"70px", height:'60px', borderRadius:'0 8px 8px 0'}}/>
                </div>
            </div>

        </PageContainer>
    );
}

export default QrCodeReaderPage;
