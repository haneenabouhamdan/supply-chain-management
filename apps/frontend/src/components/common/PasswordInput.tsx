import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  IconButton,
  ThemingProps,
} from '@chakra-ui/react';
import {
  forwardRef,
  LegacyRef,
  MutableRefObject,
  ReactNode,
  useState,
} from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface SBPasswordInputProps
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
}

export const PasswordInput = forwardRef<HTMLInputElement, SBPasswordInputProps>(
  (props, ref) => {
    const { rootProps, label, error, ...inputProps } = props;
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
      <FormControl {...rootProps} isInvalid={!!error}>
        {label && (
          <FormLabel fontWeight={'500'} className="gray">
            {label}
          </FormLabel>
        )}
        <InputGroup size="md">
          <Input
            ref={ref}
            type={show ? 'text' : 'password'}
            {...inputProps}
            _focus={{ borderColor: '#4D148C' }}
            _invalid={{ borderColor: '#c01b4a' }}
            pr="4.5rem"
          />
          <InputRightElement>
            <IconButton
              onClick={handleClick}
              className="purple"
              aria-label="Toggle Password Visibility"
              icon={show ? <ViewOffIcon /> : <ViewIcon />}
            />
          </InputRightElement>
        </InputGroup>
        {!!error && (
          <FormErrorMessage color="#c01b4a">{error}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);
