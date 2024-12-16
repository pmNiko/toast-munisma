import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/** Custom Type que maneja el estado de la petición
 * y el mensaje de respuesta. */
export type StateRequest = {
  status: 'initial' | 'loading' | 'success' | 'info' | 'error';
  message: string | null;
};

interface MessageToastProps {
  stateRequest?: StateRequest;
  timer?: number;
  loadingShow?: boolean;
  loadingMessage?: string;
  successShow?: boolean;
  infoShow?: boolean;
  errorShow?: boolean;
}

interface ToastByRequestStatus {
  [option: string]: ({
    stateRequest,
    timer,
    loadingShow,
    successShow,
    infoShow,
    errorShow,
  }: MessageToastProps) => void;
}

export const REQUEST_STATUS: ToastByRequestStatus = {
  initial: () => {},
  loading: ({ loadingShow, loadingMessage }) => {
    if (loadingShow) {
      toast.loading(loadingMessage!, { id: 'loading' });
    }
  },
  success: ({ stateRequest, timer, successShow }) => {
    toast.dismiss('loading');
    if (successShow) {
      stateRequest?.message !== '' &&
        toast.success(stateRequest?.message || '', { id: 'success' });
      setTimeout(() => {
        toast.dismiss('success');
      }, timer);
    }
  },
  info: ({ stateRequest, infoShow }) => {
    toast.dismiss('loading');
    if (infoShow) {
      toast(`${stateRequest?.message}`, { icon: 'ℹ️' });
    }
  },
  error: ({ stateRequest, errorShow }) => {
    toast.dismiss('loading');
    if (errorShow) {
      toast.error(stateRequest?.message || '');
    }
  },
};

/**
 * @CustomHook useMessageToast
 * @param resultState
 * @param-optional timmer (3000)
 * @param-optional loadingShow(false)
 * @param-optional loadingMessage(Loading...)
 * @param-optional successShow(false)
 * @param-optional infoShow(false)
 * @param-optional errorShow(false)
 */
export const useMessageToast = ({
  stateRequest,
  timer = 3000,
  loadingShow = false,
  loadingMessage = 'Loading...',
  successShow = false,
  infoShow = false,
  errorShow = true,
}: MessageToastProps) => {
  const [toastState, setToastState] = useState<StateRequest>({
    status: 'initial',
    message: '',
  });

  const loadingToastShow = (message: string) =>
    toast.loading(message, { id: 'loading-toast' });

  const loadingToastDismiss = () => toast.dismiss('loading-toast');

  const errorToastShow = (
    message = 'Servicio no disponible, por favor intente más tarde.'
  ) => toast.error(message);

  const infoToastShow = (message: string) => toast(message, { icon: 'ℹ️' });

  useEffect(() => {
    const notify = REQUEST_STATUS[stateRequest?.status || 'initial'];

    notify &&
      notify({
        stateRequest,
        timer,
        loadingShow,
        loadingMessage,
        successShow,
        infoShow,
        errorShow,
      });
  }, [stateRequest]);

  useEffect(() => {
    const notify = REQUEST_STATUS[toastState?.status || 'initial'];

    notify &&
      notify({
        stateRequest: toastState,
        timer,
        loadingShow,
        loadingMessage,
        successShow,
        infoShow,
        errorShow,
      });
  }, [toastState]);

  return {
    loadingToastShow,
    loadingToastDismiss,
    errorToastShow,
    infoToastShow,
    setToastState,
    toastState,
  };
};
