"use client"

import { useState } from 'react';
import {
  IconHome2,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../css.modules/NavbarMinimalColored.module.css'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  href: string;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, href, onClick }: NavbarLinkProps) {

  const router = useRouter();

const handleClick = () => {
    if (onClick) {
    onClick();
    }
    router.push(href)
};

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={handleClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', href: '/' },
  { icon: IconSettings, label: 'Admin Dashboard', href: '/dashboard' },
];

export function NavbarMinimalColored() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      href={link.href}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <MantineLogo type="mark" inverted size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" href='/' onClick={async () => {await signOut({ callbackUrl: '/' })}}/>
      </Stack>
    </nav>
  );
}