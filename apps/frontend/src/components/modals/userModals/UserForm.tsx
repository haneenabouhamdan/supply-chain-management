import { Box } from "@chakra-ui/layout";
import {
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
} from "@chakra-ui/tabs";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { AvatarUploader, FormInput, SwitchInput } from "../../common";
import ChangePassword from "./ChangePassword";
import { AuthUser } from "../../../resolvers";
import { UpdateUserInput } from "../../../resolvers/user/Queries";
import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { formatDate } from "../../../helpers";

interface UpdateUserProps {
  user: AuthUser;
  onClose: () => void;
  reset: UseFormReset<UpdateUserInput>;
  setValue: UseFormSetValue<UpdateUserInput>;
  register: UseFormRegister<UpdateUserInput>;
  errors: FieldErrors<UpdateUserInput>;
}

export const EditUserForm = memo(
  ({ user, setValue, reset, register, errors }: UpdateUserProps) => {
    const [changePassword, setChangePassword] = useState<boolean>(false);

    const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
      const phone = e.target.value.includes("+")
        ? e.target.value
        : `+${e.target.value}`;
      setValue("phoneNumber", phone);
    };

    const handleUploadComplete = (fileUrl: string) => {
      setValue("profilePicture", fileUrl);
    };

    useEffect(() => {
      const formattedUser = {
        ...user,
        dateOfBirth: formatDate(new Date(user.dateOfBirth)),
      };
      reset(formattedUser);
    }, [user, reset]);

    return (
      <Tabs position="relative" variant="unstyled" mt="1em">
        <TabList mb="1em">
          <Tab>Personal info</Tab>
          <Tab>About</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabIndicator mt="-20px" height="2px" bg="#f4a261" borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={4}
            >
              <AvatarUploader
                onUploadComplete={handleUploadComplete}
                imgUrl={user.profilePicture}
              />
            </Box>
            <Box mb={6}>
              <FormInput
                label="Username"
                placeholder="Enter your username"
                {...register("username")}
                error={errors.username?.message}
              />
            </Box>
            <Box mb={6}>
              <FormInput
                label="Date Of Birth"
                type="date"
                placeholder="Date of birth"
                {...register("dateOfBirth")}
                error={errors.dateOfBirth?.message}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={6}>
              <FormInput
                label="Email Address"
                placeholder="Enter your email address..."
                type="text"
                {...register("email")}
                error={errors.email?.message}
              />
              <FormInput
                label="Phone Number"
                type="text"
                placeholder="Enter your phone number..."
                {...register("phoneNumber")}
                onChange={onPhoneChange}
                error={errors.phoneNumber?.message}
              />
            </Box>
          </TabPanel>

          <TabPanel padding="10">
            <ChangePassword
              changePassword={changePassword}
              setChangePassword={setChangePassword}
              errors={errors}
              register={register}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
);
