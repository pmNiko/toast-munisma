import React from 'react';
import { Toaster } from 'react-hot-toast';

type Position =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

interface Props {
  position?: Position;
  duration?: number;
}

/**
 * Custom Toater
 * @param-optionals  position
 * @param-optionals  duration
 * @returns
 */
export const NotifyToast = ({
  position = 'top-center',
  duration = 8000,
}: Props) => {
  return (
    <Toaster
      position={position}
      reverseOrder={false}
      gutter={20}
      toastOptions={{
        style: {
          marginTop: '5em',
          marginBottom: '5em',
        },
        success: {
          duration,
          style: {
            background: '#1e90ff',
            color: 'white',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
            fontSize: '1em',
          },
        },
        loading: {
          duration,
          id: 'loading',
          style: {
            background: 'rgb(46, 125, 50)',
            color: 'white',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
            fontSize: '1em',
          },
        },
        error: {
          duration,
          style: {
            background: '#fffff',
            color: 'black',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
            fontSize: '1em',
          },
        },
      }}
    />
  );
};
