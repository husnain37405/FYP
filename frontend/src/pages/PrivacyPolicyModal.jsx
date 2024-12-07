import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { privacyPolicy } from './termsAndPrivacyContent';

const PrivacyPolicyModal = ({ isOpen, onClose, content }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '75%', sm: '65%', md: '45%' },  
          mx: 'auto',  
          mt: { xs: 1, md: 2 },  
          p: { xs: 2, sm: 2.5 }, 
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          position: 'relative',
          fontFamily: 'Poppins, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
         
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'text.secondary',
            '&:hover': { color: 'error.main' },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            color: 'primary.main',
            fontSize: { xs: '1.125rem', md: '1.25rem' }, 
          }}
        >
          Privacy & Policy
        </Typography>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-line',
            lineHeight: 1.6,
            color: 'text.primary',
            textAlign: 'justify',
            fontSize: { xs: '0.90rem', sm: '0.875rem' },  
            // fontSize: { xs: '0.75rem', sm: '0.875rem' },  
          }}
        >
           {privacyPolicy}
        </Typography>

        {/* Footer Button */}
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: { xs: '0.75rem', md: '0.875rem' }, 
            fontWeight: 500,
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          fullWidth
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default PrivacyPolicyModal;
