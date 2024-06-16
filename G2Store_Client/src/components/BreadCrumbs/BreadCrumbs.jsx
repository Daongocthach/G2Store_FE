import { Breadcrumbs, Link } from '@mui/material'

function BreadCrumbs({ links }) {
    return (
        <Breadcrumbs>
            <Link underline="hover" color="inherit" href="/">
                Trang chủ
            </Link>
            {Array.isArray(links) && links.map((link, index) => (
                <Link key={index} underline="hover" color="inherit" href={link?.href}>
                    {link?.name}
                </Link>
            ))}
        </Breadcrumbs>
    )
}

export default BreadCrumbs