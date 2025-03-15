'use client';
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    NavbarItem,
    Spinner,
  } from "@nextui-org/react";
  import React, { useCallback } from "react";

  import { useRouter } from "next/navigation";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { signOutAction } from "@/actions/auth.action";
import { UserCookie } from "@/interfaces/auth-response";
import { useSession } from "@/hooks/useSession";
  
  export const UserDropdown = () => {
    const { session, loading } = useSession();
    return(
      <>
      {loading ? (
        <Spinner size="sm" />
      ) : (
        session && <UserActive user={session} />
      )}
    </>
    );
  };



  interface Props{
    user: UserCookie;
  }


export const UserActive = ({user}:Props) => {
  const router = useRouter();
  
  const handleLogout = useCallback(async () => {
    await signOutAction()
  }, [router]);
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as='button'
            color='secondary'
            size='md'
            src={user.phono}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label='User menu actions'
        onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem
          key='profile'
          className='flex flex-col justify-start w-full items-start'>
          <p>{user.firstname} {user.lastname}</p>
          <p>{user.email}</p>
        </DropdownItem>
        {/* <DropdownItem key='settings'>My Settings</DropdownItem> */}
        {/* <DropdownItem key='team_settings'>Team Settings</DropdownItem> */}
        <DropdownItem key='analytics'>Analytics</DropdownItem>
        <DropdownItem key='system'>System</DropdownItem>
        <DropdownItem key='configurations'>Configurations</DropdownItem>
        {/* <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem> */}
        <DropdownItem
          key='logout'
          color='danger'
          className='text-danger'
          onPress={handleLogout}>
          Log Out
        </DropdownItem>
        <DropdownItem key='switch'>
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}



  