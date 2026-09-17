import React, { useEffect, useState } from 'react';
import { useController, type Control } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import MuiBox from '../muiComponents/MuiBox';
import MuiButton from '../muiComponents/MuiButton';
import MuiIconButton from '../muiComponents/MuiIconButton';
import MuiPopUp from '../muiComponents/MuiPopUp';
import MuiLoader from '../muiComponents/MuiLoader';
import { Icons } from '../icons/Icons';

export interface DocumentUploadProps {
  name: string;
  control: Control<any>;
  title?: string;
  buttonLabel?: string;
  readOnly?: boolean;
  downloadUrl?: string;
  rules?: any;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  name,
  control,
  title = 'Upload Document',
  buttonLabel = 'Choose File',
  readOnly = false,
  downloadUrl,
  rules,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const file = field.value;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof file === 'string' && file.length > 0) {
      setPreviewUrl(file);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const isImage = previewUrl && (previewUrl.startsWith('data:image') || previewUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)/i));
  const isVideo = previewUrl && (previewUrl.startsWith('data:video') || previewUrl.match(/\.(mp4|webm|ogg)/i));

  const handleDownload = async () => {
    if (!downloadUrl && !previewUrl) return;
    try {
      setIsDownloading(true);
      const url = downloadUrl || previewUrl;
      if (url) {
        window.open(url, '_blank');
      }
    } catch (e) {
      console.error('Download failed', e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <MuiBox sx={{ width: '100%' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>

      <MuiBox
        onClick={() => previewUrl && setIsPreviewOpen(true)}
        sx={{
          border: '2px dashed',
          borderColor: error ? 'error.main' : 'divider',
          borderRadius: '10px',
          p: 2,
          textAlign: 'center',
          cursor: previewUrl ? 'pointer' : 'default',
          bgcolor: 'background.default',
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          transition: 'all 0.2s ease',
          '&:hover': previewUrl ? { borderColor: 'primary.main', bgcolor: 'rgba(2, 132, 199, 0.02)' } : {},
        }}
      >
        {previewUrl ? (
          isImage ? (
            <img
              src={previewUrl}
              alt={title}
              style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain', borderRadius: '6px' }}
            />
          ) : isVideo ? (
            <video src={previewUrl} style={{ maxHeight: 100, maxWidth: '100%', borderRadius: '6px' }} />
          ) : (
            <Icons.insertDriveFileOutlinedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          )
        ) : (
          <>
            <Icons.cloudUploadOutlinedIcon sx={{ fontSize: 36, color: 'text.disabled' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Upload file or preview
            </Typography>
          </>
        )}
      </MuiBox>

      {file && (
        <MuiBox sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" noWrap sx={{ maxWidth: '80%', color: 'text.primary', fontWeight: 500 }}>
            {file instanceof File ? file.name : typeof file === 'string' ? file.split('/').pop() : 'Uploaded file'}
          </Typography>
          {!readOnly && (
            <MuiIconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                field.onChange(null);
                setPreviewUrl(null);
              }}
            >
              <Icons.closeIcon fontSize="small" />
            </MuiIconButton>
          )}
        </MuiBox>
      )}

      {!readOnly && (
        <MuiButton component="label" fullWidth size="small" variant="outlined" sx={{ mt: 1.5 }}>
          {buttonLabel}
          <input
            hidden
            type="file"
            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) {
                field.onChange(selected);
              }
            }}
          />
        </MuiButton>
      )}

      {error?.message && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {error.message}
        </Typography>
      )}

      <MuiPopUp open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} width={720}>
        <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1.5, borderBottom: '1px solid #e2e8f0' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title} Preview
          </Typography>
          <MuiIconButton onClick={() => setIsPreviewOpen(false)}>
            <Icons.closeIcon />
          </MuiIconButton>
        </MuiBox>

        <MuiBox sx={{ my: 2.5, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isImage ? (
            <img src={previewUrl || ''} alt={title} style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }} />
          ) : isVideo ? (
            <video src={previewUrl || ''} controls style={{ maxWidth: '100%', maxHeight: 400 }} />
          ) : (
            <iframe src={previewUrl || ''} title={title} style={{ width: '100%', height: 400, border: 'none' }} />
          )}
        </MuiBox>

        <MuiBox sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, pt: 1.5, borderTop: '1px solid #e2e8f0' }}>
          <MuiButton variant="outlined" onClick={() => setIsPreviewOpen(false)}>
            Close
          </MuiButton>
          {(downloadUrl || previewUrl) && (
            <MuiButton variant="contained" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? <MuiLoader size={18} /> : 'Download'}
            </MuiButton>
          )}
        </MuiBox>
      </MuiPopUp>
    </MuiBox>
  );
};

export default DocumentUpload;
