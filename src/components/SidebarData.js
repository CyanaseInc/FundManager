import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Introduction',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    active:'intro'
  },  {
    title: 'Get started',
    path: '/Started',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    active:'one'
  },
  {
    title: 'API features',
    path: '/Features',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    active:'products'
  },
  {
    title: 'Investment products',
    path: '/Products',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    active:'acc'
  },
 
  {
    title: 'User auth',
    path: '/Auth',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    active:'auth'
  },
  {
    title: 'User account details',
    path: '/Detail',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    active:'detail'
  },
  {
    title: 'Deposit',
    path: '/Deposit',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    active:'deposit'
  }
];
