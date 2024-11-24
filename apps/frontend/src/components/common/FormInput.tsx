import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  ThemingProps,
} from '@chakra-ui/react';
import { forwardRef, LegacyRef, MutableRefObject, ReactNode } from 'react';

interface SBInputProps
  extends Omit<
      InputProps,
      'variant' | 'size' | 'experimental_spaceX' | 'experimental_spaceY'
    >,
    ThemingProps {
  ref?: LegacyRef<HTMLInputElement>;
  label?: ReactNode;
  error?: ReactNode;
  info?: ReactNode;
  rootProps?: FormControlProps;
  RefCallBack?: MutableRefObject<undefined>;
  type?: 'text' | 'password' | 'email' | 'tel' | 'date';
  value?: string;
}

export const FormInput = forwardRef<HTMLInputElement, SBInputProps>(
  (props, ref) => {
    const { rootProps, label, error, type, value, ...inputProps } = props;
    return (
      <FormControl {...rootProps} isInvalid={!!error}>
        {label && (
          <FormLabel
            fontWeight={'400'}
            className="gray"
            fontSize={'14px'}
            ml={2}
          >
            {label}
          </FormLabel>
        )}
        <Input
          ref={ref}
          type={type}
          value={value}
          {...inputProps}
          _focus={{ borderColor: '#4D148C' }}
          _invalid={{ borderColor: '#c01b4a' }}
          _placeholder={{
            color: '#b7beca',
            fontSize: '14px',
            fontStyle: 'italic',
          }}
        />
        {!!error && (
          <FormErrorMessage color="#c01b4a">{error}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);
