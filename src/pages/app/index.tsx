import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/lib/logout';
import React from 'react'

function PortalHome() {
  
  const { me, loading } = useAuth();

  if (loading) return null;
  return (
    <div className='bg-zinc-50 min-h-screen flex flex-col text-zinc-700'>
      <div className="text-sm">
        {me ? `Signed in as ${me.email}` : "Not signed in"}
      </div>

      <button onClick={logout}>logout user</button>
    </div>
  )
}

export default PortalHome
