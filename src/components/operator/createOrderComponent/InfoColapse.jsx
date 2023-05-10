import React from "react";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function InfoColapse({openInfo, setOpenInfo, stock}) {
  return (
    <>
      
              <Collapse in={openInfo}>
                <Alert
                severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenInfo(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Items: {stock}
                </Alert>
              </Collapse>
    </>
  );
}
