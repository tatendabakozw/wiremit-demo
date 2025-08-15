import React from 'react'

type Props = {
    children?: React.ReactNode;
}

function AuthLayout({ children }: Props) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Base subtle linear gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-white" />

            {/* Soft radial glow top-left (blue) */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />

            {/* Soft radial glow bottom-right (gold) */}
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-secondary-200/25 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-zinc-700">
                {children}
            </div>

        </div>
    )
}

export default AuthLayout