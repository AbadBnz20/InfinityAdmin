'use client';
import { SidebarStore } from '@/store/SidebarStore'
import React from 'react'
import { StyledBurgerButton } from './navbarstyle'

export const BurguerButton = () => {
    const {OnChange}=SidebarStore()
  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={OnChange}
    >
      <div />
      <div />
    </div>
  )
}
