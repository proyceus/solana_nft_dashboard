import { AiOutlineCalendar, AiOutlineDollar, AiOutlineHome } from 'react-icons/ai';
import { BiCollection } from 'react-icons/bi';
import { IoAnalyticsOutline } from 'react-icons/io5';


export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Home',
          icon: <AiOutlineHome />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'My Collection',
          icon: <BiCollection />,
        },
        {
          name: 'Profit/Loss',
          icon: <AiOutlineDollar />,
        },
        {
          name: 'Analytics',
          icon: <IoAnalyticsOutline />,
        },
        {
          name: 'Calendar',
          icon: <AiOutlineCalendar />,
        }
      ],
    },
    
  ];