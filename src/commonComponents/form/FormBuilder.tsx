import React, { useEffect, useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import type { AlertColor } from '@mui/material/Alert';
import MuiBox from '../../muiComponents/MuiBox';
import MuiButton from '../../muiComponents/MuiButton';
import MuiLoader from '../../muiComponents/MuiLoader';
import MuiSnackbar from '../../muiComponents/MuiSnackbar';
import FormCardSection from './FormCardSection';
import type { FormBuilderProps, FormMode } from './types';

export function FormBuilder<T extends FieldValues = FieldValues>({
  formFields,
  headerLable,
  mode: initialMode = 'add',
  createAPI,
  getAPICall,
  updateAPI,
  onSubmit,
  isSaveButton = true,
  isCancelButton = true,
  defaultValues,
}: FormBuilderProps<T>) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [mode, setMode] = useState<FormMode>(initialMode);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const isView = mode === 'view';

  const formMethods = useForm<T>({
    defaultValues: defaultValues as any,
  });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = formMethods;

  useEffect(() => {
    if (id) {
      if (initialMode === 'add') setMode('edit');
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (recordId: string) => {
    if (!getAPICall) return;
    try {
      setInitialLoading(true);
      const data = await getAPICall(recordId);
      if (data) {
        reset(data);
      }
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err?.message || 'Failed to load details',
        severity: 'error',
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const submitHandler: SubmitHandler<T> = async (data) => {
    if (onSubmit) {
      onSubmit(data);
      return;
    }

    try {
      if (id && updateAPI) {
        await updateAPI({ ...data, id });
        setSnackbar({
          open: true,
          message: `${headerLable || 'Record'} updated successfully`,
          severity: 'success',
        });
        setTimeout(() => navigate(-1), 1000);
      } else if (createAPI) {
        await createAPI(data);
        setSnackbar({
          open: true,
          message: `${headerLable || 'Record'} created successfully`,
          severity: 'success',
        });
        setTimeout(() => navigate(-1), 1000);
      }
    } catch (error: any) {
      const serverDetails = error?.response?.data?.errors;
      if (serverDetails && typeof serverDetails === 'object') {
        Object.entries(serverDetails).forEach(([fieldName, message]) => {
          setError(fieldName as any, {
            type: 'server',
            message: Array.isArray(message) ? message[0] : (message as string),
          });
        });
      }

      setSnackbar({
        open: true,
        message: error?.response?.data?.message || error?.message || 'Submission failed',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <MuiBox sx={{ position: 'relative', minHeight: 'calc(100vh - 140px)', pb: 8 }}>
          {isSubmitting && (
            <MuiBox
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 20,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                backdropFilter: 'blur(2px)',
              }}
            >
              <MuiLoader size={44} />
              <Typography variant="body1" sx={{ mt: 2, fontWeight: 600, color: 'text.primary' }}>
                Saving changes...
              </Typography>
            </MuiBox>
          )}

          {headerLable && (
            <MuiBox sx={{ mb: 2.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {headerLable}
              </Typography>
            </MuiBox>
          )}

          {initialLoading ? (
            <MuiBox sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MuiLoader size={40} />
            </MuiBox>
          ) : (
            formFields.map((section, idx) => (
              <FormCardSection key={idx} title={section.title}>
                {section.fields({
                  control,
                  readOnly: isView,
                  watch: formMethods.watch,
                  setValue: formMethods.setValue,
                  getValues: formMethods.getValues,
                  trigger: formMethods.trigger,
                })}
              </FormCardSection>
            ))
          )}

          {(isSaveButton || isCancelButton) && (
            <MuiBox
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1.5,
                pt: 2,
                borderTop: '1px solid #e2e8f0',
                mt: 3,
              }}
            >
              {isCancelButton && (
                <MuiButton variant="outlined" type="button" onClick={() => navigate(-1)}>
                  Cancel
                </MuiButton>
              )}
              {isSaveButton && !isView && (
                <MuiButton variant="contained" type="submit" disabled={isSubmitting}>
                  Save
                </MuiButton>
              )}
            </MuiBox>
          )}
        </MuiBox>
      </form>

      <MuiSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}

export default FormBuilder;
