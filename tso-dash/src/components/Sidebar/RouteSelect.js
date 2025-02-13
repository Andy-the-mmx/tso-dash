'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation';
import { RxDashboard } from 'react-icons/rx';
import { BiSpreadsheet } from 'react-icons/bi';
import { LuFileSpreadsheet } from 'react-icons/lu';
import { BsBoxes } from 'react-icons/bs';
import { MdAddShoppingCart } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';

const RouteSelect = () => {
  const pathname = usePathname();
  const [selectedRoute, setSelectedRoute] = useState(pathname);

  useEffect(() => {
    setSelectedRoute(pathname);
  }, [pathname]); 

  const routes = [
    { 
      Icon: RxDashboard, 
      title: 'Dashboard', 
      link: '/',
    },
    { 
      Icon: BiSpreadsheet, 
      title: 'PO', 
      link: '/po', 
      submenu: [
        { 
          Icon: BiSpreadsheet, 
          title: 'PO Builder', 
          link: '/pobuilder', 
        },
        { 
          Icon: BiSpreadsheet, 
          title: 'PO Status', 
          link: '/postatus', 
        },
      ]
    },
    { 
      Icon: LuFileSpreadsheet, 
      title: 'ASN', 
      link: '/asn',
      submenu: [
        { 
          Icon: BiSpreadsheet, 
          title: 'ASN Builder', 
          link: '/asnbuilder',
        },
        { 
          Icon: BiSpreadsheet, 
          title: 'ASN Status', 
          link: '/asnstatus',
        },
      ]
    },
    { 
      Icon: BsBoxes, 
      title: 'Stock Control', 
      link: '/stock', 
      submenu: [
        { 
          Icon: BsBoxes, 
          title: 'Segway', 
          link: '/segway',
        },
        { 
          Icon: BiSpreadsheet, 
          title: 'Roborock', 
          link: '/asnstatus',
        },
      ]
    },
    { 
      Icon: MdAddShoppingCart, 
      title: 'Add new product', 
      link: '/addproduct', 
    },
    { 
      Icon: TbReportSearch, 
      title: 'View reports', 
      link: '/reports', 
    },
  ];

  return (
    <div className='space-y-1'>
      {routes.map((route, index) => (
        <div key={index}>
          <Route
            Icon={route.Icon}
            selected={selectedRoute === route.link}
            title={route.title}
            link={route.link}
          />
          {route.submenu && (
            <div className="ml-4 space-y-1">
              {route.submenu.map((subroute, subindex) => (
                <Route
                  key={subindex}
                  Icon={subroute.Icon}
                  selected={selectedRoute === subroute.link}
                  title={subroute.title}
                  link={subroute.link}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Route = ({ selected, Icon, title, link }) => {
  return (
    <Link 
      href={link}
      className={`text-stone-900 flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${selected
        ? 'bg-white text-stone-950 shadow' : 'hover:bg-stone-200 bg-transparent text-stone-500 shadow-none'
        }`}
    >
      <Icon className={selected ? 'text-red-500' : ''} /> {title}
    </Link>
  );
}

export default RouteSelect;