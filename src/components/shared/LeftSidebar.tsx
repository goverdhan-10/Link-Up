import { sidebarLinks } from '@/constants'
import { useUserContext } from '@/context/AuthContext'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { INavLink } from '@/types'
import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const LeftSidebar = () => {
    const navigate= useNavigate()
    const {user} = useUserContext()
    const {pathname} = useLocation()
    const {mutate: signOut, isSuccess} = useSignOutAccount()
    useEffect(()=>{
        if(isSuccess) navigate(0)
    },[isSuccess])
  return (
    <nav className='leftsidebar' >
        <div className='flex flex-col gap-7'>
        <Link to='/' className='flex gap-3 items-center'>
        <img src="/assets/images/LinkUp (1).svg" alt='logo' width={170} height={30} />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
        <img 
                src={user.imageUrl || 'assets/images/profile-placeholder.svg'}
                alt='profile'
                className='h-14 w-14 rounded-full'
                />

        <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
        </div>
        </Link>
        <ul className='flex flex-col gap-1'>
            {sidebarLinks.map((link:INavLink) => {
                const isActive=  pathname === link.route;

                return (
                    <li key={link.label}
                    className={`leftsidebar-link group ${isActive && 'bg-primary-500'}` }>

                        <NavLink to={link.route} className='flex gap-4 items-center p-4'>
                            <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`}/>

                            {link.label}
                        </NavLink>
                    </li>
                )
            })}
        </ul>

        </div>
        <Button variant="ghost" className='shad-button_ghost' onClick={() => signOut()}>
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className='small-medium lg:base-medium'> Logout</p>
            </Button>
    </nav>
  )
}

export default LeftSidebar
