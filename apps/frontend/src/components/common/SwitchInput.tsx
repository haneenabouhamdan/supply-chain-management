import { FormControl, FormLabel, Switch, SwitchProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

interface SwitchInputProps extends SwitchProps {
  label?: ReactNode;
}

export const SwitchInput = forwardRef<HTMLInputElement, SwitchInputProps>(
  ({ label, ...switchProps }, ref) => {
    return (
      <FormControl display="flex" alignItems="center">
        <Switch
          ref={ref}
          {...switchProps}
          sx={{
            '& .chakra-switch__track[data-checked]': {
              backgroundColor: '#df9155',
            },
          }}
        />
        {label && (
          <FormLabel
            htmlFor={switchProps.id}
            fontWeight={'400'}
            className="grey"
            fontSize={'16px'}
            pt={2}
            pl={4}
          >
            {label}
          </FormLabel>
        )}
      </FormControl>
    );
  }
);
