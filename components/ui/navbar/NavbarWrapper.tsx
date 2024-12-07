import { Input, Navbar, NavbarContent } from '@nextui-org/react';
import React from 'react'
import { BurguerButton } from './BurguerButton';
import {  IoSearchOutline } from 'react-icons/io5';
import { NotificationsDropdown } from './NotificationsDropdown';
import { UserDropdown } from './UserDropdown';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  children: React.ReactNode;
}
export const NavbarWrapper = ({ children }: Props) => {
  return (
  <>
      <ToastContainer />
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    <Navbar
      isBordered
      className="w-full"
      classNames={{
        wrapper: "w-full max-w-full",
      }}
    >
      <NavbarContent className="md:hidden">
        <BurguerButton />
      </NavbarContent>
      <NavbarContent className="w-full max-md:hidden">
        <Input
          startContent={<IoSearchOutline size={'20px'} />}
          isClearable
          className="w-1/3"
          classNames={{
            input: "w-full",
            mainWrapper: "w-full",
          }}
          placeholder="Search..."
        />
      </NavbarContent>
      <NavbarContent
        justify="end"
        className="w-fit data-[justify=end]:flex-grow-0"
      >
        
        <NotificationsDropdown />
        <NavbarContent>
          <UserDropdown />
        </NavbarContent>
      </NavbarContent>
    </Navbar>
    <div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>

    {children}
    </div>
  </div>
  </>
  )
}
