'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import UserSidebar from '@/components/User/UserSidebar';
import { createSelectors } from '@/lib/auto-genarate-selector';
import { useUserStore } from '@/store/user/user.store';
import { NavItem } from '@/types';
import { IProfileResponse } from '@/types/user';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) => {
  //STORE
  const userStore = createSelectors(useUserStore);
  const user = userStore.use.user();
  const pathName = usePathname();
  const SIDE_BAR_LINKS: NavItem[] = useMemo(
    () => [
      {
        title: 'User profile',
        href: `/profile/${user.id}`,
        icon: 'user',
        color: 'blue',
      },
      {
        title: 'Address book',
        href: '/address-book',
        icon: 'location',
        color: 'red',
      },
      {
        title: 'My orders',
        href: '/my-orders',
        icon: 'orders',
        color: 'orange',
      },
      {
        title: 'Logout',
        icon: 'logout',
        color: 'red',
        action: () => {
          console.log('Logout');
        },
      },
    ],
    [user.id]
  );

  const getNameBaseOnUrl = (pathName: string) => {
    const link = SIDE_BAR_LINKS.find((item) => item.href === pathName);
    return link ? link.title : '';
  };

  const getUserName = (user: IProfileResponse) => {
    return user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName;
  };

  return (
    <div className=" h-full grid md:grid-cols-3 grid-cols-1 px-16 py-12 bg-light-gray gap-4">
      <div className="col-span-3 md:col-span-1">
        {/* <div className="flex justify-start items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          {user && (
            <span className="text-lg font-bold truncate">
              {getUserName(user)}
            </span>
          )}
        </div> */}
        <div className="flex justify-between items-center gap-4 mt-4 p-2 bg-white rounded-lg">
          <UserSidebar links={SIDE_BAR_LINKS} />
        </div>
      </div>
      <div className="col-span-3 md:col-span-2 flex flex-col">
        <div className="h-8 flex items-center">
          <Breadcrumb>
            <BreadcrumbList className="text-base">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">{getNameBaseOnUrl(pathName)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mt-4 bg-white rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default layout;
