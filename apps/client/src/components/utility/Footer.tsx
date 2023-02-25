import React from 'react'

const Footer = () => {
    const SOCIAL_LINKS = [
        {
            name: 'linkedin',
            url: 'https://www.linkedin.com/in/faithyeenxin/',
            icon: '/images/footer/linkedin.svg',
        },
        {
            name: 'github',
            url: 'https://github.com/faithyeenxin',
            icon: '/images/footer/github.svg',
        },
        {
            name: 'discord',
            url: 'https://discordapp.com/users/767395011808460811',
            icon: '/images/footer/discord.svg',
        },
        {
            name: 'email',
            url: 'mailto:faith.ye@hotmail.com',
            icon: '/images/footer/email.svg',
        },
    ]
    return (
        <div className="py-5">
            <div className="flex justify-center gap-x-4">
                {SOCIAL_LINKS.map((item, idx) => <div key={idx}><a href={item.url}><img src={item.icon} /></a></div>)}
            </div>
            <div className="flex justify-center pb-1 text-orange text-sm">
                This full-stack application is brought to you by a Singapore-based web developer named Faith. Feel free to connect with her!
            </div>
        </div>
    )
}

export default Footer